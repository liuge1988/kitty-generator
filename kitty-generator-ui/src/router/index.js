import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Intro from '@/views/Intro/Intro'
import NotFound from '@/views/404'
import SingleTable from '@/views/generate/SingleTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        { 
          path: '', 
          name: '系统介绍', 
          component: Intro 
        },
        { 
          path: 'single', 
          name: '单笔查询', 
          component: SingleTable 
        }
      ]
    }
    ,{
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})