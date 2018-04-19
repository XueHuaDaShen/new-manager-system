import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import HelloWorld from '@/components/HelloWorld'
import about from '@/components/about'
import address from '@/components/address'
import lottery from '@/components/lottery'
import peopleNum from '@/components/peopleNum'
import productName from '@/components/productName'
import setAttr from '@/components/setAttr'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: '',
          redirect: 'about'
        },
        {
          path: 'about',
          name: 'about',
          component: about
        },
        {
          path: 'address',
          name: 'address',
          component: address
        },
        {
          path: 'lottery',
          name: 'lottery',
          component: lottery
        },
        {
          path: 'peopleNum',
          name: 'peopleNum',
          component: peopleNum
        },
        {
          path: 'productName',
          name: 'productName',
          component: productName
        },
        {
          path: 'setAttr',
          name: 'setAttr',
          component: setAttr
        }
      ]
    }
  ]
})
