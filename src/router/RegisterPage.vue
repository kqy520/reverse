<template>
  <div class="row justify-content-center">
    <div class="col bg-white p-5 my-5 register-wrapper">
      <div>
        <form v-show="formRedirectTimer!==0" class="text-center">
          <h2 class="mb-5">{{__('注册成功，请登录')}}</h2>
          <router-link class="btn btn-lg btn-block mb-4 btn-primary bg-secin rounded-0" to="/account/login">{{__('立即前往')}}</router-link>
          {{__('进入登录页')}} ({{formRedirectTimer}}s)
        </form>
        <form v-show="formRedirectTimer===0" @submit.prevent.stop="doSubmit" novalidate autocomplete="off">
          <h2 class="text-center mb-4">{{__('欢迎加入Testin安全')}}</h2>
          <div class="form-group">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <div class="input-group-text rounded-0">
                  <i class="iconfont icon-gongsimingcheng"/>
                </div>
              </div>
              <input v-model.trim="values.companyName" :class="{'is-invalid': errors.companyName}" type="text" class="form-control rounded-0" :placeholder="__('公司名称')">
              <div class="invalid-feedback">
                {{errors.companyName}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <div class="input-group-text rounded-0">
                  <i class="iconfont icon-zhanghaoguanli"/>
                </div>
              </div>
              <input v-model.trim="values.userName" :class="{'is-invalid': errors.userName}" type="text" class="form-control rounded-0" :placeholder="__('姓名')">
              <div class="invalid-feedback">
                {{errors.userName}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <div class="input-group-text rounded-0">
                  <i class="iconfont icon-shoujihao"/>
                </div>
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">+{{values.countryCode}}</button>
                <div class="dropdown-menu">
                  <a
                    v-for="(i, idx) in phoneCode" :key="idx"
                    @click="values.countryCode=i.val"
                    class="dropdown-item" href="#"
                  >
                    {{i.txt}} +{{i.val}}
                  </a>
                </div>
              </div>
              <input v-model.trim="values.phoneNumber" :class="{'is-invalid': errors.phoneNumber}" type="text" class="form-control rounded-0" :placeholder="__('手机号')">
              <div class="invalid-feedback">
                {{errors.phoneNumber}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <div class="input-group-text rounded-0">
                  <i class="iconfont icon-msnui-auth-code"/>
                </div>
              </div>
              <input v-model.trim="values.imgCode" :class="{'is-invalid': errors.imgCode}" type="text" class="form-control rounded-0" :placeholder="__('图形验证码')">
              <div class="input-group-append">
                <img class="img-captcha" :src="'/api/v1/account/registration/captcha?_=' + imgCaptchaRandom" alt="Captcha" @click="imgCaptchaRandom=Math.random()">
              </div>
              <div class="invalid-feedback">
                {{errors.imgCode}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <div class="input-group-text rounded-0">
                  <i class="iconfont icon-msnui-auth-code"/>
                </div>
              </div>
              <input v-model.trim="values.code" :class="{'is-invalid': errors.code}" type="text" class="form-control rounded-0" :placeholder="__('短信验证码')">
              <div class="input-group-append">
                <button @click="newSmsCaptcha" v-if="smsCaptchaTimer===0" :disabled="smsPending" class="btn btn-primary rounded-0" type="button">
                  {{smsPending ? __('发送中') : __('获取验证码')}}
                </button>
                <button v-else disabled class="btn btn-secondary rounded-0" type="button">
                  {{__('重新发送')}} {{smsCaptchaTimer}}s
                </button>
              </div>
              <div class="invalid-feedback">
                {{errors.code}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <div class="input-group-text rounded-0">
                  <i class="iconfont icon-mima"/>
                </div>
              </div>
              <input v-model.trim="values.password" :class="{'is-invalid': errors.password}" type="password" class="form-control rounded-0" :placeholder="__('密码')">
              <div class="invalid-feedback">
                {{errors.password}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <div class="input-group-text rounded-0">
                  <i class="iconfont icon-mima"/>
                </div>
              </div>
              <input v-model.trim="values.rePassword" :class="{'is-invalid': errors.rePassword}" type="password" class="form-control rounded-0" :placeholder="__('确认密码')">
              <div class="invalid-feedback">
                {{errors.rePassword}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <div class="input-group-text rounded-0">
                  <i class="iconfont icon-youxiang"/>
                </div>
              </div>
              <input v-model.trim="values.email" :class="{'is-invalid': errors.email}" type="text" class="form-control rounded-0" :placeholder="__('接收测试报告邮箱')">
              <div class="invalid-feedback">
                {{errors.email}}
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="form-check mb-4">
              <input v-model="values.agree" :class="{'is-invalid': errors.agree}" type="checkbox" class="form-check-input">
              <label class="form-check-label">
                {{__('阅读并同意')}}
                <a target="_blank" :href="licenseLink">{{__('《Testin用户服务协议》')}}</a>
              </label>
              <div class="invalid-feedback">
                {{errors.agree}}
              </div>
            </div>
          </div>
          <button type="submit" :disabled="formPending" class="btn btn-lg btn-block btn-primary bg-secin rounded-0">
            {{formPending ? __('加载中') : __('立即注册')}}
          </button>
          <div v-show="formError" class="text-center text-danger">
            {{formError}}
          </div>
        </form>
      </div>
      <div v-show="formRedirectTimer===0" class="mt-4">
        {{__('我已经有Testin账号')}}<router-link to="/account/login">{{__('直接登录')}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { validate } from '@/utils'
import { fieldValidateRules, phoneCode } from '@/config'
import { getLang, __ } from '../i18n'

const formFieldNames = ['companyName', 'userName', 'countryCode', 'phoneNumber', 'email', 'password', 'rePassword', 'imgCode', 'code', 'job', 'agree']

export default {
  beforeDestory () {
    clearInterval(this.smsIntervalId)
    clearInterval(this.formIntervalId)
  },
  data: () => ({
    licenseLink: getLang() === 'en-US'
      ? '/en/agreement.html'
      : '/agreement.html',
    phoneCode,
    formError: null, // 失败提示
    smsIntervalId: null, // 短信验证码-ID
    smsCaptchaTimer: 0, // 短信验证码-时间
    formIntervalId: null, // 表单成功跳转-ID
    formRedirectTimer: 0, // 表单成功跳转-时间
    smsPending: false, // 请求状态-发短信
    formPending: false, // 请求状态-表单
    imgCaptchaRandom: Math.random(), // 图片验证码随机数
    errors: formFieldNames.reduce((r, i) => ({[i]: '', ...r}), {}),
    values: formFieldNames.reduce((r, i) => ({[i]: '', ...r}), {
      countryCode: 86,
      agree: false
    })
  }),
  methods: {
    newSmsCaptcha (e) {
      this.errors.imgCode = validate(this.values.imgCode, fieldValidateRules.imgCode, this.values)
      this.errors.phoneNumber = validate(this.values.phoneNumber, fieldValidateRules.phoneNumber, this.values)
      if (!this.errors.imgCode && !this.errors.phoneNumber) {
        this.smsPending = true
        $.ajax({
          method: 'GET',
          url: `/api/v1/account/registration/sms?code=${this.values.imgCode}&cc=${this.values.countryCode}&mobile=${this.values.phoneNumber}`,
          complete: (xhr, status) => {
            this.smsPending = false
            if (xhr.status !== 200) {
              this.errors.imgCode = (xhr.responseJSON && xhr.responseJSON.msg) || __('验证码不正确')
              this.imgCaptchaRandom = Math.random()
            } else {
              this.errors.imgCode = ''
              this.smsCaptchaTimer = 60
              this.smsIntervalId = setInterval(() => {
                --this.smsCaptchaTimer
                if (this.smsCaptchaTimer === 0) {
                  clearInterval(this.smsIntervalId)
                }
              }, 1000)
            }
          }
        })
      }
    },
    doSubmit (e) {
      let hasError
      formFieldNames.forEach((name) => {
        this.errors[name] = validate(this.values[name], fieldValidateRules[name], this.values)
        hasError = hasError || this.errors[name]
      })
      if (hasError) {
        return
      }
      this.formPending = true
      $.ajax({
        method: 'POST',
        url: '/api/v1/account/registration',
        data: this.values,
        complete: (xhr, status) => {
          this.formPending = false
          if (xhr.status !== 200) {
            this.formError = (xhr.responseJSON && xhr.responseJSON.msg) || __('注册出错')
          } else {
            window._hmt.push(['_trackPageview', '/account/reg_success'])
            window.gtag('config', 'UA-102906426-1', {'page_path': '/account/reg_success'})
            // window.gtag('event', 'page_view')
            this.formError = null
            this.formRedirectTimer = 5
            this.formIntervalId = setInterval(() => {
              --this.formRedirectTimer
              if (this.formRedirectTimer === 0) {
                clearInterval(this.formIntervalId)
                this.$router.push('/account/login')
              }
            }, 1000)
          }
        }
      })
    }
  }
}
</script>

<style lang="sass">
  .register-wrapper
    box-shadow: 1px 1px 15px #DDD;
    min-width: 300px;
    max-width: 465px;
</style>
