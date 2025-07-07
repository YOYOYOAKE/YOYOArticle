import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  {
    text: '首页',
    link: '/',
    icon: 'material-symbols:home-rounded'
  },
  {
    text: '博客',
    link: '/blog/',
    icon: 'material-symbols:article-rounded'
  },
  {
    text: '周记',
    link: '/record/2025/',
    icon: 'material-symbols:ink-pen-rounded'
  },
  {
    text: '友链',
    link: '/friends/',
    icon: 'material-symbols:linked-services'
  },
  {
    text: '备忘录',
    link: '/memo/',
    icon: 'material-symbols:sticky-note-2-rounded'
  },
  {
    text: '知识库',
    items: [
      { text: '现代计算机图形学入门', link: '/graphics/' },
      { text: '从零开始学 Java', link: '/java/' },
      { text: '深度学习浅水区', link: '/deeplearning/' },
      { text: 'React 快速上手', link: '/react/' },
      { text: 'TypeScript 类型体操', link: '/type-challanges/' },
    ],
    icon: 'material-symbols:book-4-spark-rounded'
  },
])