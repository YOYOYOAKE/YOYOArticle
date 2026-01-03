export type SiteConfig = {
  title: string
  slogen: string
  author: string
  website: string
  lang: string
  base: string
  avatarSrc: string
}

export type Link = {
  name: string
  url: string
}

export type NavigatorConfig = {
  headerNaviLinks: Link[]
  footerNaviLinks: Link[]
}

export type SocialLinkConfig = {
  name: string
  icon: string
  url: string
  count?: number
}

export type SkillsShowcaseItem = {
  name: string
  icon: string
  url?: string
}

export type SkillsShowcaseRow = {
  direction: 'left' | 'right'
  items: SkillsShowcaseItem[]
}

export type SkillsCardConfig = {
  enabled: boolean
  title: string
  description: string
  data: SkillsShowcaseRow[]
}

export type RecentPostsConfig = {
  enabled: boolean
  title: string
  description: string
  size: number
}

export type HomeConfig = {
  title: string
  description: string
  intro: string[]
  social: SocialLinkConfig[]
  skillsCard: SkillsCardConfig
  recentPosts: RecentPostsConfig
}

export type PaginationConfig = {
  enabled: boolean
  eachPageSize: number
}

export type ListPageConfig = {
  title: string
  description: string
  pagination: PaginationConfig
}

export type TaggedPostsListConfig = {
  pagination: PaginationConfig
}

export type ListsConfig = {
  home: HomeConfig
  postsList: ListPageConfig
  jottingsList: ListPageConfig
  docsList: ListPageConfig
  friendsList: ListPageConfig
  tagsList: ListPageConfig
  taggedPostsList: TaggedPostsListConfig
}
