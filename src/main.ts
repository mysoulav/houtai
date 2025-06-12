import { createApp } from 'vue'
import Layout from './layouts/Layout.vue'
import { router } from './router'
import '../index.css'

createApp(Layout)
  .use(router)
  .mount('#app')
