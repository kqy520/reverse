<template>
  <div class="row justify-content-center">
    <div class="col bg-white p-5 forgetpwd-wrapper">
      <form v-show="formRedirectTimer!==0" class="text-center">
        <h2 class="mb-5">{{__('找回成功，请登录')}}</h2>
        <router-link class="btn btn-lg btn-block mb-4 btn-primary bg-secin rounded-0" to="/account/login">{{__('立即前往')}}</router-link>
        {{__('进入登录页')}} ({{formRedirectTimer}}s)
      </form>
      <form v-show="formRedirectTimer===0" @submit.prevent.stop="doSubmit" novalidate autocomplete="off">
        <h2 class="text-center mb-4">{{__('密码找回')}}</h2>
        <div class="form-group">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <div class="input-group-text rounded-0">
                <i class="iconfont icon-shoujihao"/>
              </div>
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">+{{values.cc}}</button>
              <div class="dropdown-menu">
                <a
                  v-for="(i, idx) in phoneCode" :key="idx"
                  @click="values.cc=i.val"
                  class="dropdown-item" href="#"
                >
                  {{i.txt}} +{{i.val}}
                </a>
              </div>
            </div>
            <input v-model.trim="values.mobile" :class="{'is-invalid': errors.mobile}" type="text" class="form-control rounded-0" :placeholder="__('手机号')">
            <div class="invalid-feedback">
              {{errors.mobile}}
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
              <img class="img-captcha" :src="'/api/v1/account/retrieve/captcha?_=' + imgCaptchaRandom" alt="Captcha" @click="imgCaptchaRandom=Math.random()">
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
            <input v-model.trim="values.password" :class="{'is-invalid': errors.password}" type="password" class="form-control rounded-0" :placeholder="__('新密码')">
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
        <button type="submit" :disabled="formPending" class="btn btn-lg btn-block btn-primary bg-secin rounded-0">
          {{formPending ? __('加载中') : __('下一步')}}
        </button>
        <div v-show="formError" class="text-center text-danger">
          {{formError}}
        </div>
      </form>
      <div v-show="formRedirectTimer===0" class="row mt-4">
        <div class="col-sm-12 col-md-6">
          <a target="_blank" href="https://www.testin.cn/account/forgot.htm">{{__('Testin注册的账户找回')}}</a>
        </div>
        <div class="col-sm-12 col-md-6 text-md-right">
          <router-link to="/account/login">{{__('返回登录')}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { validate } from '@/utils'
import { fieldValidateRules, phoneCode } from '@/config'
import { __ } from '../i18n'

const formFieldNames = ['cc', 'mobile', 'password', 'rePassword', 'imgCode', 'code']
export default {
  beforeDestory () {
    clearInterval(this.smsIntervalId)
    clearInterval(this.pwdIntervalId)
  },
  data: () => ({
    phoneCode,
    formError: null, // 注册失败提示
    smsIntervalId: null, // 短信验证码-ID
    smsCaptchaTimer: 0, // 短信验证码-时间
    formIntervalId: null, // 表单成功跳转-ID
    formRedirectTimer: 0, // 表单成功跳转-时间
    smsPending: false, // 请求状态-发短信
    formPending: false, // 请求状态-表单
    imgCaptchaRandom: Math.random(), // 图片验证码随机数
    errors: formFieldNames.reduce((r, i) => ({[i]: '', ...r}), {}),
    values: formFieldNames.reduce((r, i) => ({[i]: '', ...r}), {
      cc: 86
    })
  }),
  methods: {
    newSmsCaptcha (e) {
      this.errors.imgCode = validate(this.values.imgCode, fieldValidateRules.imgCode, this.values)
      this.errors.mobile = validate(this.values.mobile, fieldValidateRules.mobile, this.values)
      if (!this.errors.imgCode && !this.errors.mobile) {
        this.smsPending = true
        $.ajax({
          method: 'GET',
          url: `/api/v1/account/retrieve/sms?code=${this.values.imgCode}&cc=${this.values.cc}&mobile=${this.values.mobile}`,
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
        method: 'PUT',
        url: '/api/v1/account/retrieve',
        data: this.values,
        complete: (xhr, status) => {
          this.formPending = false
          if (xhr.status !== 200) {
            this.formError = (xhr.responseJSON && xhr.responseJSON.msg) || __('找回出错')
          } else {
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
  .forgetpwd-wrapper
    margin-top: 2%;
    box-shadow: 1px 1px 15px #DDD;
    min-width: 300px;
    max-width: 465px;
</style>
