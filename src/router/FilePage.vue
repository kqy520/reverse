<template>
  <div>
    <div class="card" :class="{loading: formPending}">
      <div class="loader w-100 h-100 position-absolute justify-content-center align-items-center text-muted">
        {{__('加载中...')}}
      </div>
      <div class="card-header bg-transparent p-3">
        {{__('应用管理')}}
      </div>
      <div class="card-body">
        <div class="table-responsive-sm">
          <table class="table text-nowrap mb-0">
            <thead>
              <td>{{__('应用名称')}}</td>
              <td>{{__('应用版本')}}</td>
              <td>{{__('包名')}}</td>
              <td>{{__('创建时间')}}</td>
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
                  {{i.appinfo && i.appinfo.appName}}
                </td>
                <td>v{{i.versionName || i.versionCode}}</td>
                <td>{{i.pkgName}}</td>
                <td>{{i.uploadtime | datetimefmt}}</td>
                <td>
                  <a @click.prevent.stop="setCreateTaskPid(i.pkgId)" href="">{{__('提测')}}</a> /
                  <a target="_blank" :href="i.fileinfo.fileUrl">{{__('下载')}}</a> /
                  <a @click.prevent.stop="findTask(i)" href="">{{__('提测记录')}}</a>
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
              <a @click.prevent.stop="paging({pageIndex: 1})" class="page-link rounded-0" href="">{{__('首页')}}</a>
            </li>
            <li
              class="page-item"
              v-for="i in [3,2,1]" :key="filter.pageIndex - i"
              v-show="filter.pageIndex - i >= 1"
            >
              <a @click.prevent.stop="paging({pageIndex: filter.pageIndex - i})" class="page-link" href="">{{filter.pageIndex - i}}</a>
            </li>
            <li class="page-item active"><a @click.prevent.stop class="page-link" href="">{{filter.pageIndex}}</a></li>
            <li
              class="page-item"
              v-for="i in [1,2,3]" :key="filter.pageIndex + i"
              v-show="filter.pageIndex + i <= data.totalPage"
            >
              <a @click.prevent.stop="paging({pageIndex: filter.pageIndex + i})" class="page-link" href="">{{filter.pageIndex + i}}</a>
            </li>
            <li class="page-item" :class="{disabled: filter.pageIndex >= (data.totalPage || 1)}">
              <a @click.prevent.stop="paging({pageIndex: data.totalPage || 1})"  class="page-link rounded-0" href="">{{__('尾页')}}</a>
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
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  created () {
    this.paging({pageIndex: 1})
  },
  computed: {
    ...mapState('app', {
      formPending: state => state.status === 'getlist',
      data: state => state.data,
      filter: state => state.filter,
      startRecord: state => (state.filter.pageIndex - 1) * state.filter.pageSize
    }),
    ...mapState('task', {
      taskFilter: state => state.filter
    })
  },
  methods: {
    ...mapMutations('task', {
      setCreateTaskPid: 'setCreateTaskPid',
      setFilter: 'setFilter'
    }),
    ...mapActions('app', {
      paging: 'paging'
    }),
    findTask (app) {
      this.setFilter({...this.taskFilter, appName: app.appinfo && app.appinfo.appName})
      this.$router.push('/detect/task?filter=true')
    }
  }
}
</script>

<style lang="sass">
</style>
