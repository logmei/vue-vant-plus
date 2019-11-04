import VueRouter from 'vue-router'

const routes = [
  { path: '/calendar', component: () => import('../components/calendar.vue') },
  { path: '/debounce', component: () => import('../components/debounce.vue') },
  { path: '/HelloWorld/:id', component: () => import('../components/HelloWorld.vue') },
  { path: '/list', component: () => import('../components/list.vue') }
]

const router = new VueRouter({
  routes
})

export default router
