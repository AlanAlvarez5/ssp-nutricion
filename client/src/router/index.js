import Vue from 'vue'
import VueRouter from 'vue-router'


import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/pacientes',
    name: 'Pacientes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pacientes.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  const rutaProtegida = to.matched.some(record => record.meta.requireAuth)

  if ( rutaProtegida && store.state.token === ''){
    next({name: 'Login'})
  } else {
    next()
  }


})

export default router
