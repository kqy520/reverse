import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/router/NotFound'
import DetectContainer from '@/router/DetectContainer'
import FilePage from '@/router/FilePage'
import TaskPage from '@/router/TaskPage'
import ProfilePage from '@/router/ProfilePage'
import AccountContainer from '@/router/AccountContainer'
import LoginPage from '@/router/LoginPage'
import RegisterPage from '@/router/RegisterPage'
import ForgetPwdPage from '@/router/ForgetPwdPage'
import ConfirmMailPage from '@/router/ConfirmMailPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/web/',
  scrollBehavior (to, from, savedPosition) {
    const position = { x: 0, y: 0 }
    return to.hash ? Object.assign(position, {selector: to.hash}) : position
  },
  routes: [{
    path: '/',
    redirect: '/account/login'
  }, {
    path: '/detect',
    redirect: '/detect/file',
    component: DetectContainer,
    children: [
      { path: 'file', component: FilePage, meta: { requiresAuth: true, upload: true } },
      { path: 'task', component: TaskPage, meta: { requiresAuth: true, upload: true } }
    ]
  }, {
    path: '/settings',
    redirect: '/settings/profile',
    component: DetectContainer,
    children: [
      { path: 'profile', component: ProfilePage, meta: { requiresAuth: true } }
    ]
  }, {
    path: '/account',
    redirect: '/account/login',
    component: AccountContainer,
    children: [
      { path: 'login', component: LoginPage, meta: { requiresAuth: false } },
      { path: 'register', component: RegisterPage, meta: { requiresAuth: false } },
      { path: 'forgetpwd', component: ForgetPwdPage, meta: { requiresAuth: false } },
      { path: 'confirmmail/:code', component: ConfirmMailPage }
    ]
  }, {
    path: '*',
    component: NotFound
  }]
})
