import Vue from 'vue'
import Router from 'vue-router'
import demo from '../demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: demo,
      name: 'demo',
      
    }
  ]
})
