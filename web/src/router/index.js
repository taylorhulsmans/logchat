import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Thread from '../views/Thread.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/how-to',
    name: 'HowTo',
    component: () => import(/*webpackChunkName: 'how-to'*/ '../views/HowTo.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* wepackChunkName: "dashboard"*/ '../views/Dashboard.vue'),
  },
  {
    path: '/recent',
    name: 'Recent',
    component: () => import(/* wepackChunkName: "dashboard"*/ '../views/Recent.vue')
  },
  {
    path: '/thread/:id',
    name:  'Thread',
    component: Thread,
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
