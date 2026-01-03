import { getCollection, type CollectionEntry } from 'astro:content'

type SortableArticle = {
  id: string
  data: {
    top?: boolean
    createTime?: Date
  }
}

function articleSort<T extends SortableArticle>(entries: T[]) {
  return entries.slice().sort((a, b) => {
    const topDiff = Number(Boolean(b.data.top)) - Number(Boolean(a.data.top))
    if (topDiff !== 0) return topDiff

    const bDate = b.data.createTime ?? new Date(0)
    const aDate = a.data.createTime ?? new Date(0)
    const dateDiff = bDate.getTime() - aDate.getTime()
    if (dateDiff !== 0) return dateDiff

    const parseIdOrder = (id: string) => {
      const parts = id.split('/')
      const slug = parts[parts.length - 1] ?? ''
      const match = slug.match(/^(.*?)(\d+)?$/)
      const base = match?.[1] ?? slug
      const num = match?.[2] ? Number.parseInt(match[2], 10) : 0
      return { base, num }
    }

    const aOrder = parseIdOrder(a.id)
    const bOrder = parseIdOrder(b.id)
    if (aOrder.base !== bOrder.base) return aOrder.base.localeCompare(bOrder.base)
    return aOrder.num - bOrder.num
  })
}

export function postsSort(posts: CollectionEntry<'posts'>[]) {
  return articleSort(posts)
}

export function jottingsSort(jottings: CollectionEntry<'jottings'>[]) {
  return articleSort(jottings)
}

// 获取所有非草稿文章，按时间排序
export async function getAllPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts)
}

export async function getAllJottings(): Promise<CollectionEntry<'jottings'>[]> {
  const allJottings = await getCollection('jottings')
  return jottingsSort(allJottings)
}

// 获取所有置顶文章
export async function getPinnedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  const pinnedPosts = allPosts.filter((post) => post.data.top)
  return postsSort(pinnedPosts)
}

// 获取最新的固定数量的文章
export async function getNumPosts(size: number): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts).slice(0, size)
}

// 获取标签
export async function getAllTags(): Promise<Record<string, number>> {
  const allPosts = await getAllPosts()
  const tags = allPosts.flatMap((post) => post.data.tags || [])
  return tags.reduce(
    (acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
}

// 获取project

export async function getAllFriends(): Promise<CollectionEntry<'friends'>[]> {
  const allFriends = await getCollection('friends')
  return allFriends.filter((item) => !item.data.draft)
}

export async function getAllDocEntrances(): Promise<CollectionEntry<'docs'>[]> {
  const allDocs = await getCollection('docs')
  return allDocs.filter((entry) => entry.id.endsWith('/entrance'))
}

export async function getDocsIndexItems(): Promise<
  {
    name: string
    description: string
    url: string
    icon?: string
  }[]
> {
  const allDocs = await getCollection('docs')
  const entrances = allDocs.filter((entry) => entry.id.endsWith('/entrance'))
  const pages = allDocs.filter((entry) => entry.id.includes('/') && !entry.id.endsWith('/entrance') && (entry.data as any).completed)

  const getDir = (id: string) => id.split('/').slice(0, -1).join('/')
  const getTitle = (entry: CollectionEntry<'docs'>) => String((entry.data as any).title ?? '').trim()

  const sortPages = (list: CollectionEntry<'docs'>[]) =>
    list.slice().sort((a, b) => {
      const aTitle = getTitle(a).toLowerCase()
      const bTitle = getTitle(b).toLowerCase()
      return aTitle.localeCompare(bTitle)
    })

  return entrances
    .map((entrance) => {
      const dir = getDir(entrance.id)
      const siblings = sortPages(pages.filter((p) => getDir(p.id) === dir))
      const firstPage = siblings[0]

      const name = (entrance.data as any).name ?? (entrance.data as any).title ?? dir
      const description = (entrance.data as any).description ?? ''
      const icon = (entrance.data as any).icon
      const url = (entrance.data as any).url ?? (firstPage ? `/docs/${firstPage.id}` : '/docs')

      return { name, description, url, icon }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}
