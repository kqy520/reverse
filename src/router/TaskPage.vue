<template>
  <div>
    <div class="card" :class="{loading: formPending}">
      <div class="loader w-100 h-100 position-absolute justify-content-center align-items-center text-muted">
        {{__('加载中...')}}
      </div>
      <div class="card-header bg-transparent p-3">
        {{__('任务列表')}}
      </div>
      <div class="card-body">
        <form class="form-inline mb-3">
          <select v-model="filterName" class="form-control mr-3">
            <option :value="null">{{appStatus === 'getnamelist' ? __('加载中...') : __('请选择应用名称')}}</option>
            <option v-for="(i, idx) in names" :key="idx" :value="i">{{i.appname}}</option>
          </select>
          <select v-model="filterVersion" class="form-control mr-3">
            <option :value="null">{{appStatus === 'getversionlist' ? __('加载中...') : __('请选择应用版本')}}</option>
            <option v-for="(i, idx) in versions" :key="idx" :value="i">{{i}}</option>
          </select>
          <select v-model="filterStatus" class="form-control mr-3">
            <option :value="null">{{__('请选择任务状态')}}</option>
            <option :value="0">{{__('分析中')}}</option>
            <option :value="1">{{__('完成')}}</option>
            <option :value="2">{{__('失败')}}</option>
          </select>
          <button @click.prevent.stop="setTaskFilter" type="button" class="btn btn-outline-primary rounded-0">{{__('查询')}}</button>
        </form>
        <div class="table-responsive-sm">
          <table class="table text-nowrap mb-0">
            <thead>
              <td>{{__('应用名称')}}</td>
              <td>{{__('应用版本')}}</td>
              <td>{{__('创建时间')}}</td>
              <td>{{__('任务状态')}}</td>
              <td>{{__('操作')}}</td>
            </thead>
            <tbody>
              <tr v-show="!data.list || !data.list.length">
                <td colspan="5" class="text-center py-4">
                  {{__('暂无数据')}}
                </td>
              </tr>
              <tr v-for="(i, idx) in data.list" :key="i.pkgId || idx">
                <td>
                  <img :src="i.iconFileUrl" alt="APP ICON" class="appicon mr-2">
                  {{i.appName}}
                </td>
                <td>v{{i.versionName}}</td>
                <td>{{i.createTime | datetimefmt}}</td>
                <td>
                  <span v-if="i.analysisStatus===0" class="text-muted">{{__('分析中...')}}</span>
                  <span v-if="i.analysisStatus===1" class="text-success">{{__('完成')}}</span>
                  <span v-if="i.analysisStatus===2" class="text-danger">
                    {{__('失败')}}
                    <i :title="i.actions && i.actions.length && i.actions[0].tip"
                      data-toggle="tooltip" class="iconfont icon-weirenzheng text-secondary"
                    />
                  </span>
                </td>
                <td>
                  <template v-for="(j, jidx) in i.actions">
                    <template v-if="j.displayName!=='--'">
                      <a :key="jidx" :href="j.linkUrl" :title="j.tip" target="_blank">
                        {{j.displayName}}
                      </a>
                      {{jidx !== (i.actions.length - 1) ? ' / ' : ''}}
                    </template>
                    <a v-else :key="jidx" @click.prevent.stop>
                      {{j.displayName}}
                    </a>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="data.totalRow > 0" class="card-footer bg-transparent">
        <nav class="d-md-flex justify-content-between align-items-center">
          <div>
            {{__('第')}}{{Math.min(startRecord + 1, data.totalRow || 0)}}-{{Math.min(startRecord + filter.pageSize, data.totalRow || 0)}}{{__('个')}}
            {{__('总共')}}{{data.totalRow || 0}}{{__('个应用')}}
          </div>
          <ul class="pagination mb-0">
            <li class="page-item" :class="{disabled: filter.pageIndex <= 1}">
              <a @click.prevent.stop="paging(Object.assign(filter, {pageIndex: 1}))" class="page-link rounded-0" href="">{{__('首页')}}</a>
            </li>
            <li
              class="page-item"
              v-for="i in [3,2,1]" :key="filter.pageIndex - i"
              v-show="filter.pageIndex - i >= 1"
            >
              <a @click.prevent.stop="paging(Object.assign(filter, {pageIndex: filter.pageIndex - i}))" class="page-link" href="">{{filter.pageIndex - i}}</a>
            </li>
            <li class="page-item active"><a @click.prevent.stop class="page-link" href="">{{filter.pageIndex}}</a></li>
            <li
              class="page-item"
              v-for="i in [1,2,3]" :key="filter.pageIndex + i"
              v-show="filter.pageIndex + i <= data.totalPage"
            >
              <a @click.prevent.stop="paging(Object.assign(filter, {pageIndex: filter.pageIndex + i}))" class="page-link" href="">{{filter.pageIndex + i}}</a>
            </li>
            <li class="page-item" :class="{disabled: filter.pageIndex >= (data.totalPage || 1)}">
              <a @click.prevent.stop="paging(Object.assign(filter, {pageIndex: data.totalPage || 1}))"  class="page-link rounded-0" href="">{{__('尾页')}}</a>
            </li>
            <!-- <li>
              <input type="text" class="d-sm-none d-md-block form-control ml-3 mr-3 rounded-0 text-center" placeholder="页数" style="max-width: 4rem;"/>
            </li>
            <li>
              <button class="d-sm-none d-md-block btn btn-outline-primary rounded-0">跳转</button>
            </li> -->
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapState, mapActions, mapMutations } from 'vuex'
import DatePicker from '@/components/DatePicker'
export default {
  components: {
    DatePicker
  },
  created () {
    const filter = {...(this.$route.query.filter ? this.filter : {}), pageIndex: 1}
    this.paging(filter)
    this.getNameList({})
  },
  updated () {
    $('i[data-toggle=tooltip]').tooltip()
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].analysisStatus === 0) {
        var that = this
        var ivt = setInterval(function () {
          const filter = {pageIndex: that.filter.pageIndex}
          that.paging(filter)
          clearInterval(ivt)
        }, 60000)
      }
    }
  },
  data: () => ({
    filterName: null,
    filterVersion: null,
    filterDate: null,
    filterStatus: null
  }),
  computed: {
    ...mapState('app', {
      names: state => state.names,
      versions: state => state.versions,
      appStatus: state => state.status
    }),
    ...mapState('task', {
      formPending: state => state.status === 'getlist',
      data: state => state.data,
      filter: state => state.filter,
      startRecord: state => (state.filter.pageIndex - 1) * state.filter.pageSize
    })
  },
  methods: {
    ...mapActions('app', {
      getNameList: 'getNameList',
      getVersionList: 'getVersionList'
    }),
    ...mapActions('task', {
      paging: 'paging'
    }),
    ...mapMutations('app', {
      setVersionData: 'setVersionData'
    }),
    setTaskFilter () {
      const filter = {pageIndex: 1}
      if (this.filterName !== null) {
        filter.appName = this.filterName.appname
      }
      if (this.filterVersion !== null) {
        filter.versionName = this.filterVersion
      }
      if (this.filterStatus !== null) {
        filter.analysisStatus = this.filterStatus
      }
      this.paging(filter)
    }
  },
  watch: {
    filterName () {
      this.filterVersion = null
      this.setVersionData([])
      if (this.filterName) {
        this.getVersionList({ appId: this.filterName.appid })
      }
    }
  }
}
</script>

<style lang="sass">
</style>
