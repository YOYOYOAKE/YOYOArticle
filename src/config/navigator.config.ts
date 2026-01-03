import type { NavigatorConfig } from '../types/config'

const home = {
  name: 'Home',
  url: '/',
}

const posts = {
  name: 'Posts',
  url: '/posts',
}

const jottings = {
  name: 'Jottings',
  url: '/jottings',
}

const docs = {
  name: 'Docs',
  url: '/docs',
}

const friends = {
  name: 'Friends',
  url: '/friends',
}

const tags = {
  name: 'Tags',
  url: '/tags',
}

const headerNaviLinks = [home, posts, jottings, docs, friends]

const footerNaviLinks = [posts, jottings, docs, friends, tags]

const navigatorConfig: NavigatorConfig = { headerNaviLinks, footerNaviLinks }

export default navigatorConfig
