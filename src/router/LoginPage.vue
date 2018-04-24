<template>
  <div class="row justify-content-center">
    <div class="col bg-white p-5 login-wrapper">
      <form @submit.prevent.stop="doSubmit" novalidate>
        <h2 class="text-center mb-4">{{__('登录Testin安全')}}</h2>
        <div class="form-group">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <div class="input-group-text rounded-0">
                <i class="iconfont icon-zhanghaoguanli"/>
              </div>
            </div>
            <input v-model.trim="values.username" :class="{'is-invalid': errors.username}" type="text" class="form-control rounded-0" :placeholder="__('手机号码/邮箱')">
            <div class="invalid-feedback">
              {{errors.username}}
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
        <button type="submit" :disabled="formPending" class="btn btn-lg btn-block btn-primary bg-secin rounded-0">
          {{formPending ? __('加载中') : __('登录')}}
        </button>
        <div v-show="formError" class="text-center text-danger">
          {{formError}}
        </div>
      </form>
      <div class="row mt-4">
        <div class="col-sm-12 col-md-8">
          {{__('还没有账号？')}}<router-link to="/account/register">{{__('前去注册')}}</router-link>
        </div>
        <div class="col-sm-12 col-md-4 text-md-right">
          <router-link to="/account/forgetpwd">{{__('忘记密码')}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { validate } from '@/utils'
import { fieldValidateRules } from '@/config'

const formFieldNames = ['username', 'password']

export default {
  data: () => ({
    formError: null,
    errors: formFieldNames.reduce((r, i) => ({[i]: '', ...r}), {}),
    values: formFieldNames.reduce((r, i) => ({[i]: '', ...r}), {})
  }),
  computed: {
    ...mapState('user', {
      formPending: state => state.status === 'login'
    })
  },
  methods: {
    ...mapActions('user', {
      login: 'login'
    }),
    doSubmit (e) {
      let hasError
      formFieldNames.forEach((name) => {
        this.errors[name] = validate(this.values[name], fieldValidateRules[name], this.values)
        hasError = hasError || this.errors[name]
      })
      if (!hasError) {
        this.login({
          values: this.values,
          callback: (data, error) => (this.formError = error) ? null : this.$router.push('/detect/file')
        })
      }
    }
  }
}
</script>

<style lang="sass">
  .login-wrapper
    margin-top: 10%;
    box-shadow: 1px 1px 15px #DDD;
    min-width: 300px;
    max-width: 465px;
</style>
