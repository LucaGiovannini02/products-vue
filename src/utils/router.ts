import { createRouter, createWebHistory } from 'vue-router'

import Cart from '../pages/Cart.vue'
import Home from '../pages/Home.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/cart', component: Cart },
  { path: '/:pathMatch(.*)*', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router