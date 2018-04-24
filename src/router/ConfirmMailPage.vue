<template>
  <div class="row justify-content-center">
    <div class="col col-xs-10 col-sm-8 col-md-6 col-lg-4 bg-white p-5 login-wrapper">
      <form v-show="formPending" class="text-center my-3">
        <h2>{{__('请稍后...')}}</h2>
      </form>
      <form v-show="!formError" class="text-center my-3">
        <h2 class="mb-4">{{__('邮箱认证成功')}}</h2>
        {{__('重新登录后将更新认证状态')}}
        <router-link class="btn btn-lg btn-block mt-4 btn-primary bg-secin rounded-0" to="/account/login">{{__('立即登录')}}</router-link>
      </form>
      <form v-show="formError" class="text-center my-3">
        <h2 class="mb-4">{{__('邮箱认证失败')}}</h2>
        {{formError}}
        <router-link class="btn btn-lg btn-block mt-4 btn-primary bg-secin rounded-0" to="/account/login">{{__('立即登录')}}</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  created () {
    this.userValidateMail({
      code: this.$route.params.code,
      callback: (data, error) => (this.formError = error) ? null : this.userLogout({})
    })
  },
  data: () => ({
    status: null,
    formError: null
  }),
  computed: {
    ...mapState('user', {
      formPending: state => state.status === 'confirmmail'
    })
  },
  methods: {
    ...mapActions('user', {
      userValidateMail: 'validateMail',
      userLogout: 'logout'
    })
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
