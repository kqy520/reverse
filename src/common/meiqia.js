import { getLang } from '../i18n'
const meiqiaFunction = (...args) => {
  meiqiaFunction.a = meiqiaFunction.a || []
  meiqiaFunction.a.push(args)
}

export const MEIQIA = '_MEIQIA'

export const initMeiqia = () => {
  window[MEIQIA] = window[MEIQIA] || meiqiaFunction
  const script = document.createElement('script')
  script.async = true
  script.charset = 'UTF-8'
  script.src = '//static.meiqia.com/dist/meiqia.js?_=t'
  document.getElementsByTagName('script')[0].parentNode.insertBefore(script, undefined)
  window[MEIQIA]('entId', '2709')
  window[MEIQIA]('metadata', {
    name: '',
    email: '',
    tel: '',
    姓名: '',
    公司: '',
    电话: ''
  })
  window[MEIQIA]('language', getLang().slice(0, 2))
}
