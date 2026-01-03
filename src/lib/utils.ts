import type { CollectionEntry } from 'astro:content'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const DEFAULT_TIME_ZONE = 'Asia/Shanghai'

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes))
}

function parseIdOrder(id: string) {
  const parts = id.split('/')
  const slug = parts[parts.length - 1] ?? ''
  const match = slug.match(/^(.*?)(\d+)?$/)
  const base = match?.[1] ?? slug
  const num = match?.[2] ? Number.parseInt(match[2], 10) : 0
  return { base, num }
}

// 文章按时间排序
export function postsSort(posts: CollectionEntry<'posts'>[]) {
  return posts.slice().sort((a, b) => {
    const topDiff = Number(Boolean(b.data.top)) - Number(Boolean(a.data.top))
    if (topDiff !== 0) return topDiff

    const bDate = (b.data as any).createTime
    const aDate = (a.data as any).createTime
    const dateDiff = bDate.getTime() - aDate.getTime()
    if (dateDiff !== 0) return dateDiff

    const aOrder = parseIdOrder(a.id)
    const bOrder = parseIdOrder(b.id)
    if (aOrder.base !== bOrder.base) return aOrder.base.localeCompare(bOrder.base)
    return aOrder.num - bOrder.num
  })
}

// 日期格式化类型
export type DateFormat = 'default' | 'dot' | 'short' | 'iso' | 'chinese'

function getYmdInTimeZone(date: Date, timeZone: string = DEFAULT_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)

  const year = parts.find((p) => p.type === 'year')?.value ?? ''
  const month = parts.find((p) => p.type === 'month')?.value ?? ''
  const day = parts.find((p) => p.type === 'day')?.value ?? ''
  return { year, month, day }
}

// 日期格式化函数
export const formatDate = (date: Date, format: DateFormat = 'default'): string => {
  switch (format) {
    case 'dot':
      // 2020.03.03 格式
      const { year, month, day } = getYmdInTimeZone(date)
      return `${year}.${month}.${day}`

    case 'short':
      // Mar 3, 2020 格式
      return date.toLocaleDateString('en-US', {
        timeZone: DEFAULT_TIME_ZONE,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })

    case 'iso':
      // 2020-03-03 格式
      const iso = getYmdInTimeZone(date)
      return `${iso.year}-${iso.month}-${iso.day}`

    case 'chinese':
      // 2020年3月3日 格式
      const { year: cy, month: cm, day: cd } = getYmdInTimeZone(date)
      return `${cy}年${Number(cm)}月${Number(cd)}日`

    case 'default':
    default:
      // March 3, 2020 格式（默认）
      return date.toLocaleDateString('en-US', {
        timeZone: DEFAULT_TIME_ZONE,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
  }
}
