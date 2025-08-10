import { defineClientConfig } from 'vuepress/client'
import CustomHome from './theme/components/CustomHome.vue'

import './theme/styles/custom.css'
import './theme/styles/image.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('CustomHome', CustomHome)
  },
})
