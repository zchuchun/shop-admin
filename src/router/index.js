import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Users from '@/components/Users'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '/users',
      component: Users
    }]
  }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  // 如果是去登录的，放行
  if (to.path === '/login') {
    next()
    return
  }
  // 如果不是去登录的，判断是否有token，如果有，就放行，没有，就去登录
  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})
// 给router对象设置导航守卫
export default router
