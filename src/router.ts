import { createRouter, createWebHistory } from 'vue-router'
import PaymentPage from './views/PaymentPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'payment', component: PaymentPage }
  ]
})
