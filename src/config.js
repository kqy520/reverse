import { __ } from './i18n'

export const phoneCode = [
  { txt: __('中国'), val: 86 },
  { txt: __('香港'), val: 852 },
  { txt: __('澳门'), val: 853 },
  { txt: __('台湾'), val: 886 },
  { txt: __('美国'), val: 1 },
  { txt: __('马来西亚'), val: 60 },
  { txt: __('泰国'), val: 66 },
  { txt: __('菲律宾'), val: 63 },
  { txt: __('日本'), val: 81 },
  { txt: __('韩国'), val: 82 },
  { txt: __('新加坡'), val: 65 },
  { txt: __('英国'), val: 44 },
  { txt: __('澳大利亚'), val: 61 },
  { txt: __('俄罗斯'), val: 7 },
  { txt: __('巴西'), val: 55 },
  { txt: __('西班牙'), val: 34 },
  { txt: __('阿根廷'), val: 54 },
  { txt: __('加拿大'), val: 1 }
]

export const fieldValidateRules = {
  companyName: [
    { type: 'required', message: __('请输入公司名称') },
    { type: 'minlength', minlength: 2, message: __('公司名称最少2个字符') },
    { type: 'maxlength', maxlength: 128, message: __('公司名称最多128个字符') }
  ],
  userName: [
    { type: 'required', message: __('请输入姓名') },
    { type: 'minlength', minlength: 2, message: __('姓名最少2个字符') },
    { type: 'maxlength', maxlength: 16, message: __('姓名最多16个字符') }
  ],
  countryCode: [
    { type: 'required', message: __('请输入国家代码(数字)') },
    { type: 'pattern', pattern: /^\d{1,4}$/, message: __('请输入有效的国家代码') }
  ],
  phoneNumber: [
    { type: 'required', message: __('请输入手机号') },
    { type: 'pattern', pattern: /^\d{8,}$/, message: __('请输入有效的手机号') }
  ],
  email: [
    { type: 'required', message: __('请输入邮箱地址') },
    { type: 'email', message: __('请输入有效的邮箱地址') },
    { type: 'maxlength', maxlength: 128, message: __('邮箱地址最多128个字符') }
  ],
  password: [
    { type: 'required', message: __('请输入密码') },
    { type: 'minlength', minlength: 6, message: __('密码最少6个字符') },
    { type: 'maxlength', maxlength: 32, message: __('密码最多32个字符') }
  ],
  rePassword: [
    { type: 'custom', custom: (value, values) => value === values.password, message: __('两次输入的密码不一致') }
  ],
  imgCode: [
    { type: 'required', message: __('请输入图形验证码') },
    { type: 'pattern', pattern: /^[a-zA-Z0-9]{6}$/, message: __('图形验证码不正确') }
  ],
  code: [
    { type: 'required', message: __('请输入短信验证码') },
    { type: 'pattern', pattern: /^\d{6}$/, message: __('短信验证码不正确') }
  ],
  job: [
    { type: 'optional', message: __('请输入职位') },
    { type: 'minlength', minlength: 1, message: __('职位最少1个字符') },
    { type: 'maxlength', maxlength: 16, message: __('职位最多16个字符') }
  ],
  agree: [
    { type: 'custom', custom: (value, values) => !!value, message: __('您还未同意用户服务协议') }
  ],
  username: [
    { type: 'required', message: __('请输入账号') },
    { type: 'minlength', minlength: 5, message: __('账号最少5个字符') },
    { type: 'maxlength', maxlength: 32, message: __('账号最多32个字符') }
  ]
}
// field alias name
fieldValidateRules.cc = fieldValidateRules.countryCode
fieldValidateRules.mobile = fieldValidateRules.phoneNumber
fieldValidateRules.oldpwd = fieldValidateRules.password

export const taskTypeList = [{
  name: 'normal',
  text: __('应用安全扫描'),
  price: 1,
  icon: '/images/secin-task-normal.png',
  description: [
    __('针对 Android 应用'),
    __('分析编码、配置、资源'),
    __('细致解读漏洞与风险'),
    __('精准定位代码问题'),
    __('给您最专业的整改建议')
  ]
}]

export default {}
