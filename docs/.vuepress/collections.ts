import { ThemeCollections } from "vuepress-theme-plume"

const collections: ThemeCollections = [
  {
    type: 'post',
    dir: 'articles',
    title: '文章',
    link: '/articles/',
  },
  {
    type: 'post',
    dir: 'memo',
    title: '备忘录',
    link: '/memo/',
  },
  {
    type: 'doc',
    dir: 'record/2025',
    title: '周记',
    sidebar: 'auto',
    linkPrefix: '/record/2025/',
  },
  {
    type: 'doc',
    dir: 'repos/graphics',
    title: '现代计算机图形学入门',
    sidebar: 'auto',
    linkPrefix: '/graphics/',
  },
  {
    type: 'doc',
    dir: 'repos/java',
    title: '从零开始学 Java',
    sidebar: 'auto',
    linkPrefix: '/java/',
  },
  {
    type: 'doc',
    dir: 'repos/deeplearning',
    title: '深度学习浅水区',
    sidebar: 'auto',
    linkPrefix: '/deeplearning/',
  },
  {
    type: 'doc',
    dir: 'repos/react',
    title: 'React 快速上手',
    sidebar: 'auto',
    linkPrefix: '/react/',
  },
  {
    type: 'doc',
    dir: 'repos/type-challanges',
    title: 'TypeScript 类型体操',
    sidebar: 'auto',
    linkPrefix: '/type-challanges/',
  },  
]

export default collections