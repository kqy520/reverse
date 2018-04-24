import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import user from './modules/user'
import app from './modules/app'
import task from './modules/task'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // initial state
  state: {
    alert: null
  },
  // mutations
  mutations: {
    setAlert (state, payload) {
      state.alert = payload
    }
  },
  modules: {
    user,
    app,
    task
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
