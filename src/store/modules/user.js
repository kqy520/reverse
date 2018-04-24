import * as api from '../../api/user'

let storageUser
try {
  storageUser = JSON.parse(localStorage.getItem('user'))
} catch (e) {}

// initial state
const state = {
  status: null,
  error: null,
  logined: !!storageUser,
  current: storageUser
}

// mutations
const mutations = {
  setFormState (state, payload) {
    state.status = payload
  },
  setLogined (state, payload) {
    state.logined = payload
  },
  setCurrentUser (state, payload) {
    localStorage.setItem('user', JSON.stringify(payload))
    state.current = payload
  }
}

// getters
const getters = {
  userText: state => !state.current ? null : (state.current.username || state.current.email || state.current.mobile)
}

// actions
const actions = {
  // 登录
  login ({ dispatch, commit, state }, {values, callback}) {
    commit('setFormState', 'login')
    api.login(values, (data, error) => {
      commit('setFormState', null)
      if (error) {
        commit('setLogined', false)
      } else {
        commit('setLogined', true)
        dispatch('getUserInfo', {})
      }
      if (typeof callback !== 'undefined') {
        callback(data, error)
      }
    })
  },
  // 注销
  logout ({ commit, state }, {callback}) {
    commit('setFormState', 'logout')
    api.logout((data, error) => {
      commit('setFormState', null)
      commit('setLogined', false)
      commit('setCurrentUser', null)
      if (typeof callback !== 'undefined') {
        callback(data, error)
      }
    })
  },
  // 查询当前用户信息
  getUserInfo ({ commit, state }, {callback}) {
    commit('setFormState', 'get')
    api.getInfo((data, error) => {
      commit('setFormState', null)
      if (error) {
        commit('setCurrentUser', null)
      } else {
        commit('setCurrentUser', data)
      }
      if (typeof callback !== 'undefined') {
        callback(data, error)
      }
    })
  },
  // 修改密码
  resetPwd ({ commit, state }, {values, callback}) {
    commit('setFormState', 'resetpwd')
    api.resetPwd(values, (data, error) => {
      commit('setFormState', null)
      if (typeof callback !== 'undefined') {
        callback(data, error)
      }
    })
  },
  // 发送验证邮件
  sendMail ({ commit, state }, { callback }) {
    commit('setFormState', 'sendmail')
    api.sendMail((data, error) => {
      commit('setFormState', null)
      if (typeof callback !== 'undefined') {
        callback(data, error)
      }
    })
  },
  // 验证邮箱
  validateMail ({ commit, state }, { code, callback }) {
    commit('setFormState', 'confirmmail')
    api.validateMail(code, (data, error) => {
      commit('setFormState', null)
      if (typeof callback !== 'undefined') {
        callback(data, error)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
