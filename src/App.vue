<template>
  <div id="app">
    <div v-if="!!alert" class="alert message px-5" :class="`alert-${alert.type}`">
      {{alert.content}}
    </div>
    <header>
      <nav class="navbar navbar-expand-md justify-content-between navbar-dark bg-dark">
        <a class="navbar-brand p-0" :href="lang==='en-US' ? '/en' : '/'">
          <img :src="`${lang==='en-US' ? '/en/' : '/'}images/logo.png`" alt="LOGO">
        </a>
        <button
          class="navbar-toggler" type="button"
          data-toggle="collapse" data-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" v-if="lang!=='en-US'" @click.prevent="changeLangTo('en-US')" href="">English</a>
              <a class="nav-link" v-else  @click.prevent="changeLangTo('zh-CN')" href="">中文</a>
            </li>
            <template v-if="!logined">
              <li class="nav-item">
                <router-link class="nav-link" to="/account/login">{{__('登录')}}</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link border rounded px-3 py-1 mt-1" to="/account/register">{{__('注册')}}</router-link>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <div v-if="currUser && currUser.emailVerified===1" class="text-muted border border-success px-2 mt-1" style="border-radius: 15px;">
                  <i class="iconfont icon-yirenzheng text-success"/> {{__('邮箱已认证')}}
                </div>
                <div v-else class="validate-mail text-muted px-2 mt-1">
                  <i class="iconfont icon-weirenzheng text-danger"/> {{__('邮箱未认证')}}
                  <button @click="sendmail" :class="{'btn-primary': !mailSended}" :disabled="formPending" type="button" class="btn btn-sm rounded-0">
                    {{ formPending ? __('发送中...') : (mailSended ? __('已发送') : __('发送验证邮件'))}}
                  </button>
                </div>
              </li>
              <li class="nav-item dropdown ml-5">
                <a href="#" class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="iconfont icon-zhanghaoguanli" style="display: inline-block; font-size: 24px; position: absolute; top: 0; transform: translateX(-120%);"/>
                  {{ username }}
                </a>
                <div class="dropdown-menu dropdown-menu-right rounded-0" aria-labelledby="navbarDropdownMenuLink">
                  <router-link class="dropdown-item" to="/settings/profile">{{__('设置')}}</router-link>
                  <a @click.prevent.stop="logout" class="dropdown-item" href="#">{{__('退出')}}</a>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </nav>
    </header>
    <main class="container-fluid">
      <router-view/>
    </main>
    <footer class="d-none d-sm-block fixed-bottom text-center text-muted border-top">
      {{__('北京云聚信安科技有限公司')}}
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import { getLang, setLang, __ } from './i18n'

export default {
  data: () => ({
    lang: getLang(),
    alertIntervalId: null,
    alertTimer: 0,
    mailSended: false
  }),
  computed: {
    ...mapState({
      alert: state => state.alert
    }),
    ...mapState('user', {
      formPending: state => state.status === 'sendmail',
      logined: state => state.logined,
      currUser: state => state.current
    }),
    ...mapGetters('user', {
      username: 'userText'
    })
  },
  methods: {
    ...mapActions('user', {
      userLogout: 'logout',
      getUserInfo: 'getUserInfo',
      userSendMail: 'sendMail'
    }),
    ...mapMutations({
      setAlert: 'setAlert'
    }),
    changeLangTo (lang) {
      setLang(lang)
      window.location.reload()
    },
    sendmail () {
      if (!this.mailSended) {
        this.userSendMail({callback: (data, error) => {
          if (error) {
            this.setAlert({type: 'danger', content: error})
          } else {
            this.setAlert({type: 'success', content: __('邮件已发送, 请打开邮箱查看')})
            this.mailSended = true
          }
          this.alertTimer = 3
          clearInterval(this.alertIntervalId)
          this.alertIntervalId = setInterval(() => {
            --this.alertTimer
            if (this.alertTimer === 0) {
              clearInterval(this.alertIntervalId)
              this.setAlert(null)
            }
          }, 1000)
        }})
      }
    },
    logout () {
      this.userLogout({callback: () => this.$router.push('/account/login')})
    }
  },
  watch: {
    currUser () {
      this.mailSended = false
    }
  }
}
</script>

<style lang="sass">
@mixin bg-secin()
  background: linear-gradient(to right, #A061FF , #0283FF) #0283FF
@import "~bootstrap/scss/bootstrap"
@import "~bootstrap-datepicker/dist/css/bootstrap-datepicker3"

html
  font-size: 14px
html, body
  background-color: #F5F6FA
#app
  > header
    .navbar-brand
      text-align: center
      width: 100px
      > img
        height: 25px
    .navbar-dark .navbar-nav
      .nav-item
        margin-left: 1.6rem
        position: relative
        .nav-link
          color: #FFF
  > main
    margin-bottom: 30px
  > footer
    line-height: 25px
    background: #FDFDFD

.message
  position: fixed
  z-index: 10
  top: 2px
  margin: 0 auto
  width: auto
  max-width: 50%
  left: 50%
  right: auto
  transform: translateX(-50%)
.bg-secin
  @include bg-secin()
.img-captcha
  width: 93px
  height: 36.5px
  cursor: pointer
  border: 1px solid $input-border-color
.validate-mail
  position: relative
  cursor: pointer
  overflow: hidden
  border-radius: 15px
  border: 1px solid $danger
  &:hover
    border-color: transparent
    border-radius: 0
    .btn
      top: 0
  .btn
    position: absolute
    top: 100%
    left: 0
    width: 100%
    height: 100%
#filePicker
  label
    margin-bottom: 0
  .webuploader-pick
    @include bg-secin()
    padding: 0.6rem 1.2rem
    border-radius: 0
    min-width: 160px
.appicon
  height: 1.15rem
  width: 1.15rem
.task-type.card
  max-width: 200px
  cursor: pointer
  &.active, &:hover
    border-color: $primary
    flex-basis: 100%
.card
  &.loading
    .card-header, .card-body, .card-footer
      filter: blur(3px) grayscale(.65)
    .loader
      z-index: 2
      font-weight: bold
      display: flex
      background-color: rgba($light, 0.35)
      font-size: 1.2rem
      letter-spacing: 0.2rem
  .loader
    display: none
#MEIQIA-PANEL-HOLDER
  right: ($grid-gutter-width / 2)!important
#MEIQIA-BTN-HOLDER
  bottom: 120px!important
</style>
