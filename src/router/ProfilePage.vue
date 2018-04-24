<template>
  <div class="row justify-content-center">
    <div class="col bg-white p-5 my-5 register-wrapper">
      <div>
        <form @submit.prevent.stop="doSubmit" novalidate autocomplete="off">
          <h2 class="text-center mb-4">{{__('修改密码')}}</h2>
          <div class="form-group">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <div class="input-group-text rounded-0">
                  <i class="iconfont icon-mima"/>
                </div>
              </div>
              <input v-model.trim="values.oldpwd" :class="{'is-invalid': errors.oldpwd}" type="password" class="form-control rounded-0" :placeholder="__('原密码')">
              <div class="invalid-feedback">
                {{errors.oldpwd}}
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
            {{formPending ? __('加载中') : __('修改密码')}}
          </button>
          <div v-show="formError" class="text-center text-danger">
            {{formError}}
          </div>
          <div v-show="resetted" class="text-center text-success">
            {{__('修改成功，下次登录请使用新密码')}}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { validate } from '@/utils'
import { fieldValidateRules } from '@/config'

const formFieldNames = ['oldpwd', 'password', 'rePassword']

export default {
  beforeDestory () {
    clearTimeout(this.timer)
  },
  data: () => ({
    timer: null,
    resetted: false,
    formError: null,
    errors: formFieldNames.reduce((r, i) => ({[i]: '', ...r}), {}),
    values: formFieldNames.reduce((r, i) => ({[i]: '', ...r}), {})
  }),
  computed: {
    ...mapState('user', {
      formPending: state => state.status === 'resetpwd'
    })
  },
  methods: {
    ...mapActions('user', {
      resetPwd: 'resetPwd'
    }),
    doSubmit (e) {
      let hasError
      formFieldNames.forEach((name) => {
        this.errors[name] = validate(this.values[name], fieldValidateRules[name], this.values)
        hasError = hasError || this.errors[name]
      })
      if (!hasError) {
        this.resetPwd({
          values: this.values,
          callback: (data, error) => {
            if (!(this.formError = error)) {
              Object.keys(this.values).forEach((k) => (this.values[k] = ''))
              this.resetted = true
              this.timer = setTimeout(() => (this.resetted = false), 3000)
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="sass">
  .register-wrapper
    box-shadow: 1px 1px 15px #DDD;
    min-width: 300px;
    max-width: 400px;
</style>
