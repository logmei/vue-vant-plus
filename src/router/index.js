import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  { path: '/calendar', component: () => import('../components/calendar.vue') },
  { path: '/debounce', component: () => import('../components/debounce.vue') },
  { path: '/HelloWorld/:id', component: () => import('../components/HelloWorld.vue') },
  { path: '/list', component: () => import('../components/list.vue') },
  { path: '/searchPage', component: () => import('../components/search.vue') },
  { path: '/steps', component: () => import('../components/steps.vue') }
]

const router = new VueRouter({
  routes
})

export default router
