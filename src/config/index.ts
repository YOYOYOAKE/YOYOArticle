export { default as siteConfig } from './site.config'
export { default as listsConfig } from './pages.config'
export { default as navigatorConfig } from './navigator.config'

export type {
  HomeConfig,
  ListPageConfig,
  ListsConfig,
  NavigatorConfig,
  PaginationConfig,
  RecentPostsConfig,
  SiteConfig,
  SkillsCardConfig,
  SkillsShowcaseItem,
  SkillsShowcaseRow,
  SocialLinkConfig,
  TaggedPostsListConfig,
} from '../types/config'

import siteConfig from './site.config'
import listsConfig from './pages.config'
import navigatorConfig from './navigator.config'

export default { siteConfig, listsConfig, navigatorConfig }
