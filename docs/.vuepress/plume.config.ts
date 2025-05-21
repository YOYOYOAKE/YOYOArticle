import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: 'https://oss.yoake.cc/yoyopics/avatar-round.webp',
  // logo: false
  // your git repo url
  // docsRepo: '',
  // docsDir: 'docs',

  appearance: true,

  profile: {
    avatar: 'https://oss.yoake.cc/yoyopics/avatar-round.webp',
    name: 'YOAKE',
    description: 'Per Aspera Ad Astra.',
    circle: true,
    // location: '',
    // organization: '',
  },

  navbar,
  notes,
  
  social: [
    { icon: 'github', link: 'https://github.com/yoyoyoake/' },
  ],

})
