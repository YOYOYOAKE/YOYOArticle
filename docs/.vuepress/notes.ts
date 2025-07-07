import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const record_2025 = defineNoteConfig({
  dir: 'YOYORecord - 2025',
  link: 'record/2025/',
  sidebar: [
    {
      text: '行迹 2025',
      link: 'index.md',
      items: 'auto'
    },
  ]
})

const graphics = defineNoteConfig({
  dir: 'YOYORepos/graphics',
  link: '/graphics/',
  sidebar: [
    {
      text: '现代计算机图形学入门',
      link: 'index.md',
      items: 'auto'
    },
  ]
})

const java = defineNoteConfig({
  dir: 'YOYORepos/java',
  link: '/java/',
  sidebar: [
    {
      text: 'Java',
      link: 'index.md',
      items: 'auto'
    },
  ]
})

const deeplearning = defineNoteConfig({
  dir: 'YOYORepos/deeplearning',
  link: '/deeplearning/',
  sidebar: [
    {
      text: '深度学习浅水区',
      link: 'index.md',
      items: 'auto'
    },
  ]
})

const react = defineNoteConfig({
  dir: 'YOYORepos/react',
  link: '/react/',
  sidebar: [
    {
      text: 'React 快速上手',
      link: 'index.md',
      items: 'auto'
    },
  ]
})

const ts = defineNoteConfig({
  dir: 'YOYORepos/type-challanges/',
  link: '/type-challanges/',
  sidebar: [
    {
      text: 'TypeScript 类型体操',
      link: 'index.md',
      items: 'auto'
    },
  ]
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [
    record_2025,
    graphics,
    java,
    deeplearning,
    react,
    ts,
  ],
})