import $ from 'jquery'
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import { getLang, __ } from './i18n'
import { initMeiqia } from './common/meiqia'
// $.fn.datepicker.dates['zh-CN'] = {
//   days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
//   daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
//   daysMin: ['日', '一', '二', '三', '四', '五', '六'],
//   months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
//   monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
//   today: '今日',
//   clear: '清除',
//   format: 'yyyy年mm月dd日',
//   titleFormat: 'yyyy年mm月',
//   weekStart: 1
// }

Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.prototype.__ = __

const datetimefmt = (value) => {
  if (value === null) {
    return ''
  }
  let datetime
  if (/(iPhone|Safari|rv:)/.test(navigator.userAgent) && /\d{4}-\d{2}-\d{2}/.test(value)) {
    value = value.replace(/-/g, '/').replace('T', ' ').slice(0, 19)
    datetime = new Date(value)
    datetime.setHours(datetime.getHours() + datetime.getTimezoneOffset() / -60)
  } else {
    datetime = new Date(value)
  }
  datetime.setHours(datetime.getHours() + datetime.getTimezoneOffset() / -60)
  datetime = datetime.toISOString()
  return `${datetime.slice(0, 10)} ${datetime.slice(11, 19)}`
}
Vue.filter('datetimefmt', datetimefmt)
Vue.filter('datefmt', (value) => datetimefmt(value).slice(0, 10))

// check logined
const hasLogined = JSON.parse(localStorage.getItem('user'))
store.dispatch('user/getUserInfo', {callback: (data, error) => (error || hasLogined) ? null : window.location.reload()})

document.title = __('【Testin安全】- 您身边的安全专家')

// 401
$.ajaxSetup({
  cache: false,
  headers: {
    'Accept-Language': getLang()
  },
  statusCode: {
    401 () {
      store.dispatch('user/logout', {callback: () => router.push('/account/login')})
    }
  }
})

// check permission
router.beforeEach((to, from, next) => {
  if (!store.state.user.logined && to.meta.requiresAuth === true) {
    next('/account/login')
  } else if (store.state.user.logined && to.meta.requiresAuth === false) {
    next(from.meta.requiresAuth === true ? false : '/detect/file')
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  window._hmt.push(['_trackPageview', to.path])
  window.gtag('config', 'UA-102906426-1', {'page_path': to.path})
  // window.gtag('event', 'page_view')
})
initMeiqia()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
