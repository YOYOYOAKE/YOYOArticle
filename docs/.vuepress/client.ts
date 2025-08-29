import { defineClientConfig } from 'vuepress/client'
import MyHomeHero from './theme/components/MyHomeHero.vue'

import './theme/styles/custom.css'
import './theme/styles/image.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('MyHomeHero', MyHomeHero)
  },
})
