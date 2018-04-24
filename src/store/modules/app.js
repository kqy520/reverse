import * as api from '../../api/app'

// initial state
const state = {
  data: {},
  names: [],
  versions: [],
  filter: {
    pageIndex: 1,
    pageSize: 10
  },
  status: null
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
  setNameData (state, payload) {
    state.names = payload
  },
  setVersionData (state, payload) {
    state.versions = payload
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
  // 获取应用列表
  getList ({ dispatch, commit, state }, {callback}) {
    commit('setFormState', 'getlist')
    api.getAppList(state.filter, (data, error) => {
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
  // 获取名称列表
  getNameList ({ dispatch, commit, state }, {callback}) {
    commit('setFormState', 'getnamelist')
    api.getNameList((data, error) => {
      commit('setFormState', null)
      if (error) {
        commit('setNameData', [])
      } else {
        commit('setNameData', data.data)
      }
      if (typeof callback !== 'undefined') {
        callback(data, error)
      }
    })
  },
  // 获取版本列表
  getVersionList ({ dispatch, commit, state }, {appId, callback}) {
    commit('setFormState', 'getversionlist')
    api.getVersionList(appId, (data, error) => {
      commit('setFormState', null)
      if (error) {
        commit('setVersionData', [])
      } else {
        commit('setVersionData', data.data)
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
