import Vue from 'vue'
import Router from 'vue-router'

import TrackingDashboard from './layouts/TrackingDashboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'TrackingDashboard',
      component: TrackingDashboard
    },
  ]
})
