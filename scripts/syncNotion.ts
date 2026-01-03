import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

/**
 * 脚本入口：读取 env/config，导出单个页面。
 */
async function main() {
  // 读取并验证 NOTION_TOKEN
  const notionToken = process.env['NOTION_TOKEN']
  if (!notionToken) {
    throw new Error('Missing NOTION_TOKEN env var.')
  }

  // 读取并验证 NOTION_PAGE_ID
  const notionPageId = process.env['NOTION_PAGE_ID']
  if (!notionPageId) {
    throw new Error('Missing NOTION_PAGE_ID env var.')
  }
  if (!/^[0-9a-fA-F]{32}$/.test(notionPageId)) {
    throw new Error('NOTION_PAGE_ID must be a 32-character string without hyphens.')
  }

  const notion = new Client({ auth: notionToken })
  const n2m = new NotionToMarkdown({ notionClient: notion })
  installCustomTransformer(n2m, notion)

  try {
    await exportPage(notion, n2m, notionPageId)
  } catch (err) {
    throw err
  }
}

/**
 * 导出单个 Notion 页面为 Markdown：写入文件并打印提取到的元数据 JSON。
 */
async function exportPage(notion: Client, n2m: NotionToMarkdown, notionPageId: string) {
  const page = await notion.pages.retrieve({ page_id: notionPageId })
  const meta = extractMeta(page)

  const mdBlocks = await n2m.pageToMarkdown(notionPageId)
  const mdString = n2m.toMarkdownString(mdBlocks)

  const content = (mdString.parent ?? '').trim() + '\n'
  const frontmatter = buildFrontmatter(meta)
  const md = `${frontmatter}\n\n${content}`

  const filePath = await buildFilePath(meta, page?.id ?? notionPageId)

  await writeFile(filePath, md, 'utf8')
  console.error(`Wrote ${filePath}`)
  console.log(JSON.stringify(meta, null, 2))
}

/**
 * 安装自定义转换器
 */
function installCustomTransformer(n2m: NotionToMarkdown, notion: Client) {
  n2m.setCustomTransformer('code', async (block: any) => {
    return parseEnhanceCodeBlock(block, n2m)
  })

  n2m.setCustomTransformer('callout', async (block: any) => {
    return parseCalloutBlock(block, n2m, notion)
  })
}

/**
 * 增强代码块解析器
 */
async function parseEnhanceCodeBlock(block: any, n2m: NotionToMarkdown): Promise<string | false> {
  if (!block || typeof block !== 'object' || block.type !== 'code') return false

  const code = block.code as { rich_text?: any[]; language?: string }
  const languageRaw = typeof code?.language === 'string' ? code.language : ''
  const language = languageRaw.toLowerCase() === 'plain text' ? '' : languageRaw

  const codeText = richTextToMarkdown(n2m, code?.rich_text ?? [])
  const normalized = (codeText ?? '').replace(/\r\n/g, '\n')
  const lines = normalized.split('\n')
  const firstLine = lines[0] ?? ''

  const directiveMatch = firstLine.match(/^\s*\/\/\s*(.+?)\s*$/)
  const directiveMeta = (directiveMatch?.[1] ?? '').trim()
  const hasDirectiveMeta = Boolean(directiveMeta && /^(title|ins|del|mark)=/i.test(directiveMeta))

  const meta = hasDirectiveMeta ? directiveMeta : null
  const content = (hasDirectiveMeta ? lines.slice(1).join('\n') : normalized).trimEnd()

  const fenceInfo = `${language ? language : ''}${meta ? `  ${meta}` : ''}`.trimEnd()
  const opening = `\`\`\`${fenceInfo}`.trimEnd()
  return `${opening}\n${content}\n\`\`\``
}

/**
 * Callout 块解析器
 */
async function parseCalloutBlock(block: any, n2m: NotionToMarkdown, notion: Client): Promise<string | false> {
  type ObsidianCalloutType = 'note' | 'tip' | 'important' | 'warning' | 'caution'
  if (!block || typeof block !== 'object' || block.type !== 'callout') return false

  const allowedCalloutTypes: ReadonlySet<string> = new Set(['note', 'tip', 'important', 'warning', 'caution'])

  const parseHeader = (input: string): { type: ObsidianCalloutType; title: string; body: string } => {
    const lines = (input ?? '').replace(/\r\n/g, '\n').split('\n')
    const firstNonEmptyIndex = lines.findIndex((l) => l.trim())
    if (firstNonEmptyIndex === -1) return { type: 'note', title: '', body: '' }

    const firstLine = lines[firstNonEmptyIndex]!.trim()
    const match = firstLine.match(/^([a-zA-Z]+)(?:\s+(.*))?$/)
    const keyword = match?.[1]?.toLowerCase() ?? ''
    if (!allowedCalloutTypes.has(keyword)) {
      return { type: 'note', title: '', body: input }
    }

    const type = keyword as ObsidianCalloutType
    const title = (match?.[2] ?? '').trim()
    const body = lines
      .slice(firstNonEmptyIndex + 1)
      .join('\n')
      .replace(/^\s*\n+/, '')
      .trimEnd()
    return { type, title, body }
  }

  const callout = block.callout as { rich_text?: any[] }
  const ownText = richTextToMarkdown(n2m, callout?.rich_text ?? []).trim()
  const parsedOwn = parseHeader(ownText)

  let childrenMarkdown = ''
  if ('has_children' in block && Boolean(block.has_children)) {
    const children = await getAllBlockChildren(notion, block.id)
    const mdBlocks = await n2m.blocksToMarkdown(children as any)
    const mdStringObj = n2m.toMarkdownString(mdBlocks)
    childrenMarkdown = (mdStringObj.parent ?? '').trim()
  }

  const combinedBody = [parsedOwn.body, childrenMarkdown].filter(Boolean).join('\n\n')
  const headerLine = `> [!${parsedOwn.type}]${parsedOwn.title ? ` ${parsedOwn.title}` : ''}`
  return combinedBody.trim() ? `${headerLine}\n${quoteLines(combinedBody)}` : headerLine
}

/**
 * 从 page 对象中提取文章元数据
 */
function extractMeta(page: any): {
  title: string
  description: string
  category: string
  tags: string[]
  completed: boolean
  top: boolean
  createTime: string
  lastEditedTime: string
} {
  const pageId = page?.id ? String(page.id) : 'unknown'
  const props = page?.properties ?? {}

  const title =
    props?.title?.type === 'title' && Array.isArray(props.title.title)
      ? props.title.title
          .map((t: any) => t?.plain_text ?? '')
          .join('')
          .trim()
      : ''

  const description =
    props?.description?.type === 'rich_text' && Array.isArray(props.description.rich_text)
      ? props.description.rich_text
          .map((t: any) => t?.plain_text ?? '')
          .join('')
          .trim()
      : ''

  if (typeof title !== 'string' || !title.trim()) {
    throw new Error(`Notion page meta missing/invalid field (${pageId}): title`)
  }
  if (typeof description !== 'string' || !description.trim()) {
    throw new Error(`Notion page meta missing/invalid field (${pageId}): description`)
  }

  const categoryRaw = props?.category?.type === 'select' ? (props.category.select?.name ?? '') : ''
  if (typeof categoryRaw !== 'string' || !categoryRaw.trim()) {
    throw new Error(`Notion page meta missing/invalid field (${pageId}): category`)
  }
  const category = String(categoryRaw ?? '')
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[. ]+$/g, '')

  if (!category) {
    throw new Error(`Notion page meta invalid field (${pageId}): category`)
  }

  const tags =
    props?.tags?.type === 'multi_select' && Array.isArray(props.tags.multi_select)
      ? props.tags.multi_select.map((t: any) => t?.name).filter(Boolean)
      : []
  const trimmedTags = (tags ?? []).map((t: unknown) => String(t ?? '').trim()).filter(Boolean)
  if (trimmedTags.length === 0) {
    throw new Error(`Notion page meta missing/invalid field (${pageId}): tags`)
  }

  const completed = props?.completed?.type === 'checkbox' ? Boolean(props.completed.checkbox) : false

  const top = props?.top?.type === 'checkbox' ? Boolean(props.top.checkbox) : false

  const createTime = page?.created_time ?? ''
  const lastEditedTime = page?.last_edited_time ?? ''
  if (typeof createTime !== 'string' || !createTime.trim() || Number.isNaN(new Date(createTime).getTime())) {
    throw new Error(`Notion page meta missing/invalid field (${pageId}): createTime`)
  }
  if (typeof lastEditedTime !== 'string' || !lastEditedTime.trim() || Number.isNaN(new Date(lastEditedTime).getTime())) {
    throw new Error(`Notion page meta missing/invalid field (${pageId}): lastEditedTime`)
  }

  return {
    title,
    description,
    category,
    tags: trimmedTags,
    completed,
    top,
    createTime,
    lastEditedTime,
  }
}

/**
 * 构建 Markdown Frontmatter
 */
function buildFrontmatter(meta: ReturnType<typeof extractMeta>): string {
  const singleQuote = (value: string): string => {
    return `'${String(value ?? '').replace(/'/g, "''")}'`
  }

  const lines: string[] = []

  lines.push('---')
  lines.push(`title: ${singleQuote(meta.title)}`)
  lines.push(`description: ${singleQuote(meta.description)}`)
  lines.push(`category: ${singleQuote(meta.category)}`)
  lines.push(`createTime: ${formatTime(meta.createTime, 'date')}`)
  lines.push(`lastEditedTime: ${formatTime(meta.lastEditedTime, 'datetime')}`)
  lines.push(`completed: ${meta.completed}`)
  lines.push(`top: ${meta.top}`)
  lines.push(`tags: [${(meta.tags ?? []).map((t) => singleQuote(t)).join(', ')}]`)
  lines.push('---')
  return lines.join('\n')
}

/**
 * 将 ISO 时间字符串格式化为本地时间字符串。
 * - `date` -> `YYYY-MM-DD`
 * - `datetime` -> `YYYY-MM-DD HH:mm:ss`
 */
function formatTime(isoString: string, mode: 'date' | 'datetime'): string {
  if (!isoString) return ''
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return ''

  const pad2 = (n: number) => String(n).padStart(2, '0')
  const y = date.getFullYear()
  const m = pad2(date.getMonth() + 1)
  const d = pad2(date.getDate())
  if (mode === 'date') return `${y}-${m}-${d}`

  const hh = pad2(date.getHours())
  const mm = pad2(date.getMinutes())
  const ss = pad2(date.getSeconds())
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

/**
 * 生成文件路径：
 * - category 为 posts/jottings -> `src/content/{category}/YYYYMMDD-{pageId[-4]}.md`
 * - 其他 -> `src/content/docs/{category}/YYYYMMDD-{pageId[-4]}.md`
 */
async function buildFilePath(meta: ReturnType<typeof extractMeta>, pageId: string): Promise<string> {
  const ymd = formatTime(meta.createTime, 'date').replace(/-/g, '')
  const tail4 = pageId.length >= 4 ? pageId.slice(-4) : pageId
  const fileName = `${ymd || '00000000'}-${tail4}.md`

  const isPostCategory = meta.category === 'posts' || meta.category === 'jottings'
  const fileDir = isPostCategory
    ? path.join(process.cwd(), 'src', 'content', meta.category)
    : path.join(process.cwd(), 'src', 'content', 'docs', meta.category)
  await mkdir(fileDir, { recursive: true })

  const filePath = path.join(fileDir, fileName)

  return filePath
}

/**
 * 获取指定 block 的所有子 blocks（自动处理分页）。
 */
async function getAllBlockChildren(notion: Client, blockId: string) {
  const results: any[] = []
  let cursor: string | undefined = undefined
  do {
    const resp = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    })
    results.push(...resp.results)
    cursor = resp.has_more ? (resp.next_cursor ?? undefined) : undefined
  } while (cursor)
  return results
}

/**
 * 将 Notion 的 `rich_text` 数组转换为 Markdown，保留样式标注与链接。
 */
function richTextToMarkdown(n2m: NotionToMarkdown, richText: any[]): string {
  let out = ''
  for (const content of richText ?? []) {
    if (content.type === 'equation') {
      out += `$${content.equation?.expression ?? ''}$`
      continue
    }
    const annotated = n2m.annotatePlainText(content.plain_text ?? '', content.annotations)
    out += content.href ? `[${annotated}](${content.href})` : annotated
  }
  return out
}

/**
 * 将文本按行转换为引用块
 */
function quoteLines(text: string): string {
  return (text ?? '')
    .split('\n')
    .map((line) => (line.trim() ? `> ${line}` : '>'))
    .join('\n')
}

/**
 * 判断当前模块是否作为入口文件直接运行（而不是被测试/其他模块 import）。
 */
const isEntrypoint = (() => {
  const entry = process.argv[1]
  if (!entry) return false
  return import.meta.url === pathToFileURL(entry).href
})()

if (isEntrypoint) {
  main().catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
}
