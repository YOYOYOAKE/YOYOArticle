import { defineClientConfig } from 'vuepress/client'
import CustomHome from './theme/components/CustomHome.vue'
import CustomHomeTitle from './theme/components/CustomHomeTitle.vue';

import './theme/styles/custom.css'
import './theme/styles/image.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('CustomHome', CustomHome)
    app.component('CustomHomeTitle', CustomHomeTitle)
  },
})
