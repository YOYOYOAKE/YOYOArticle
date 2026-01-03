import type { ListsConfig } from '../types/config'

const home: ListsConfig['home'] = {
  title: 'YOYOArticle',
  description: 'Birds are born with no shackles.',
  intro: [
    '欢迎到访，我是 YOAKE。这个词来源于日语「夜明け」的罗马音，意为「黎明」。',
  ],
  social: [
    {
      name: 'GitHub',
      icon: 'icon-[mdi--github]',
      url: 'https://github.com/yoyoyoake',
    },
    {
      name: 'Gmail',
      icon: 'icon-[mdi--gmail]',
      url: 'mailto:yo2yoake@gmail.com',
    },
  ],
  skillsCard: {
    enabled: true,
    title: 'Skills',
    description: '技多不压身',
    data: [
      {
        direction: 'left',
        items: [
          {
            name: 'HTML',
            icon: 'icon-[skill-icons--html]',
          },
          {
            name: 'CSS',
            icon: 'icon-[skill-icons--css]',
          },
          {
            name: 'JavaScript',
            icon: 'icon-[skill-icons--javascript]',
          },
          {
            name: 'TypeScript',
            icon: 'icon-[skill-icons--typescript]',
          },
          {
            name: 'Node.js',
            icon: 'icon-[skill-icons--nodejs-light]',
          },
          {
            name: 'Vue',
            icon: 'icon-[skill-icons--vuejs-light]',
          },
          {
            name: 'Vite',
            icon: 'icon-[skill-icons--vite-light]',
          },
        ],
      },
      {
        direction: 'right',
        items: [
          {
            name: 'Python',
            icon: 'icon-[skill-icons--python-light]',
          },
          {
            name: 'FastAPI',
            icon: 'icon-[skill-icons--fastapi]',
          },
          {
            name: 'Flask',
            icon: 'icon-[skill-icons--flask-light]',
          },
          {
            name: 'Go',
            icon: 'icon-[skill-icons--golang]',
          },
          {
            name: 'SQLite',
            icon: 'icon-[skill-icons--sqlite]',
          },
          {
            name: 'PostgreSQL',
            icon: 'icon-[skill-icons--postgresql-light]',
          },
        ],
      },
      {
        direction: 'left',
        items: [
          {
            name: 'Git',
            icon: 'icon-[skill-icons--git]',
          },
          {
            name: 'Debian',
            icon: 'icon-[skill-icons--debian-light]',
          },
          {
            name: 'Ubuntu',
            icon: 'icon-[skill-icons--ubuntu-light]',
          },
          {
            name: 'Docker',
            icon: 'icon-[skill-icons--docker]',
          },
          {
            name: 'Cloudflare',
            icon: 'icon-[skill-icons--cloudflare-light]',
          },
        ],
      },
    ],
  },
  recentPosts: {
    enabled: true,
    title: 'Recent',
    description: '新篇速递',
    size: 3,
  },
}

const postsList: ListsConfig['postsList'] = {
  title: 'Posts',
  description: '风带来故事的种子，时间使其发芽。',
  pagination: {
    enabled: true,
    eachPageSize: 10,
  },
}

const jottingsList: ListsConfig['jottingsList'] = {
  title: 'Jottings',
  description: '我有一杯酒，足以慰风尘。尽倾江海里，赠饮天下人。',
  pagination: {
    enabled: true,
    eachPageSize: 10,
  },
}

const docsList: ListsConfig['docsList'] = {
  title: 'Docs',
  description: '知识就是培根。',
  pagination: {
    enabled: true,
    eachPageSize: 10,
  },
}

const friendsList: ListsConfig['friendsList'] = {
  title: 'Friends',
  description: '心有高朋身自富，君有奇才我不贫。',
  pagination: {
    enabled: true,
    eachPageSize: 10,
  },
}

const tagsList: ListsConfig['tagsList'] = {
  title: 'Tags',
  description: '一旦你给我贴上标签，你就否定了我。',
  pagination: {
    enabled: true,
    eachPageSize: 10,
  },
}

const taggedPostsList: ListsConfig['taggedPostsList'] = {
  pagination: {
    enabled: true,
    eachPageSize: 10,
  },
}

const listsConfig: ListsConfig = { home, postsList, jottingsList, docsList, friendsList, tagsList, taggedPostsList }

export default listsConfig
