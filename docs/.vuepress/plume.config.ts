import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import collections from './collections'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: 'https://oss.yoake.cc/art/avatars/avatar-round.webp',

  appearance: true,

  profile: {
    avatar: 'https://oss.yoake.cc/art/avatars/avatar-round.webp',
    name: 'YOAKE',
    description: 'Per Aspera Ad Astra.',
    circle: true,
  },

  navbar,
  collections,

  social: [
    { icon: 'github', link: 'https://github.com/yoyoyoake/' },
  ],

  autoFrontmatter: {
    createTime: false,
  },

  createTime: 'only-posts',

})
