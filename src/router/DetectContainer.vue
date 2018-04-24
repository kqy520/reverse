<template>
  <div>
    <div class="row">
      <nav class=" col-md-2 d-sm-inline bg-light sidebar">
        <div class="sidebar-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/detect/file">
                <i class="iconfont icon-Group"/>
                {{__('应用管理')}}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/detect/task">
                <i class="iconfont icon-renwuguanli"/>
                {{__('任务管理')}}
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <div class="col-md-10 pt-3">
        <web-uploader v-if="!!currUser && $route.meta.upload" :currUser="currUser" @uploaded="onUploaded" />
        <create-test @created="onCreated"/>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import WebUploader from '@/components/WebUploader'
import CreateTest from '@/components/CreateTest'

export default {
  components: {
    WebUploader,
    CreateTest
  },
  computed: {
    ...mapState('user', {
      currUser: state => state.current
    })
  },
  methods: {
    ...mapActions('app', {
      pagingFile: 'paging'
    }),
    ...mapActions('task', {
      pagingTask: 'paging'
    }),
    ...mapMutations('task', {
      setCreateTaskPid: 'setCreateTaskPid'
    }),
    onUploaded (data) {
      this.setCreateTaskPid(data.appInfo.pkgid)
      this.pagingFile({pageIndex: 1})
    },
    onCreated (data) {
      this.pagingTask({pageIndex: 1})
    }
  }
}
</script>

<style lang="sass">
.sidebar
  background-color: #FFFFFF;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .1);
  .sidebar-sticky
    position: sticky;
    top: 49px;
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
    .nav-link
      line-height: 2rem;
      color: #333333;
      &.active
        font-weight: bold;
        background-color: #F0F3FC;
      &:hover
        background-color: #F0F3FC;
      i
        display: inline-block;
        margin-right: 1rem;
        margin-left: 0.5rem;
@media (min-width: 768px)
  .sidebar
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    .sidebar-sticky
      height: calc(100vh - 79px);
.table
  thead
    background-color: #F5F6FA;
    td
      border-top: none;
  tbody
    td
      border-color: #F5F6FA;
</style>
