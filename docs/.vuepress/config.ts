import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { notes } from './notes'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'YOYOArticle',
  head: [
    ['link', {
      rel: 'icon',
      href: 'https://oss.yoake.cc/yoyopics/avatar-round.webp'
    }]
  ],

  bundler: viteBundler(),

  theme: plumeTheme({
    notes,
    
    hostname: 'https://www.yoake.cc',
    footer: {
      message: `
        <span>
          Copyright ©️ 2024 - 2025 YOAKE | Powered by <a href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a href="https://theme-plume.vuejs.press/">Plume</a>
        </span>
        <br/>
        <span style="font-size: 11px;">
          冀 ICP 备 2025102465号-1 · 京公网安备 11011502038573 号
        </span>`,
    },

    plugins: {
      git: false,
      search: false,
      shiki: { langs: [] },
    },
  }),
})
