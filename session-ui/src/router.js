import Vue from 'vue'
import Router from 'vue-router'
import Refresh from '@/views/Refresh'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Index')
      .then(page => page)
      .catch(() => Refresh),
      redirect: { name: 'session' },
      children: [
        {
          name: 'session',
          path: 'session',
          component: () => import('@/views/Session')
          .then(page => page)
          .catch(() => Refresh),
        }
      ]
    }
  ],
})

export default router
