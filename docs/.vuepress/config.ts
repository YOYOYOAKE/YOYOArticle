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
      href: 'https://oss.yoake.cc/art/avatars/avatar-round.webp'
    }]
  ],

  bundler: viteBundler(),

  theme: plumeTheme({
    notes,

    hostname: 'https://www.yoake.cc',
    footer: {
      message: `
        <span style="user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;">
          Copyright ©️ 2024 - 2025 YOAKE | Powered by <a href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a href="https://theme-plume.vuejs.press/">Plume</a>
        </span>
        <br/>
        <span style="font-size:11px;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;">
          冀 ICP 备 2025102465号-1 · 京公网安备 11011502038573 号
        </span>`,
    },

    encrypt: {
      rules: {
        '/record/': 'YOYORecord'
      }
    },

    plugins: {
      git: false,
      search: false,
      shiki: { langs: [] },
    },

    markdown: {
      timeline: true,
      codeTree: true,
      mermaid: true,
    }
  }),
})
