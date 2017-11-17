import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import All from '@/components/All'
import Detail from '@/components/Detail'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Recharge from '@/components/Recharge'
import Cart from '@/components/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
        path: '/all',
        name: 'All',
        component: All
    },
    {
        path: '/detail/:uid?',
        name: 'Detail',
        component: Detail
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/recharge',
        name: 'Recharge',
        component: Recharge
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    }
  ]
})
