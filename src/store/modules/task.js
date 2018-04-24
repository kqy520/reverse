import * as api from '../../api/task'

// initial state
const state = {
  data: {},
  filter: {
    pageIndex: 1,
    pageSize: 10
  },
  status: null,
  balance: {free: false, times: 0},
  createTaskPid: null
}

// mutations
const mutations = {
  setFormState (state, payload) {
    state.status = payload
  },
  setFilter (state, payload) {
    state.filter = payload
  },
  setData (state, payload) {
    state.data = payload
  },
  setBalance (state, payload) {
    state.balance = payload
  },
  setCreateTaskPid (state, payload) {
    state.createTaskPid = payload
  }
}

// getters
const getters = {
}

// actions
const actions = {
  // 分页
  paging ({ dispatch, commit, state }, {callback, ...filter}) {
    filter.pageSize = filter.pageSize || state.filter.pageSize
    commit('setFilter', filter)
    dispatch('getList', {callback})
  },
  // 获取任务列表
  getList ({ dispatch, commit, state }, {callback}) {
    commit('setFormState', 'getlist')
    api.getTaskList(state.filter, (data, error) => {
      commit('setFormState', null)
      if (error) {
        commit('setData', {})
      } else {
        commit('setData', data)
      }
      if (typeof callback !== 'undefined') {
        callback(data, error)
      }
    })
  },
  // 提测
  create ({ dispatch, commit, state }, {values, callback}) {
    commit('setFormState', 'create')
    api.create(values, (data, error) => {
      commit('setFormState', null)
      if (typeof callback !== 'undefined') {
        callback(data, error)
      }
    })
  },
  // 查询配额
  getBalance ({ dispatch, commit, state }, {callback}) {
    commit('setFormState', 'balance')
    api.getBalance((data, error) => {
      commit('setFormState', null)
      if (error) {
        commit('setBalance', {free: false, times: 0})
      } else {
        commit('setBalance', data.data)
      }
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
