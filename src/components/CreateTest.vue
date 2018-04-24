<template>
  <div class="modal" id="uploadModel" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div v-show="!created" class="card">
            <div class="card-header">{{__('提交测试')}}</div>
            <div class="card-body">
              <div class="card-deck justify-content-center task-type">
                <div
                  v-for="i in taskTypeList" :key="i.name"
                  class="task-type card text-muted text-center" :class="{active: type === i.name}"
                  @click="((type = i.name), (price = i.price))"
                >
                  <h5 class="border-bottom py-2 mb-0">{{i.text}}</h5>
                  <div class="card-body">
                    <img :src="i.icon" alt="ICON" />
                    <p class="card-text mt-3">
                      <span v-for="(j, idx) in i.description" :key="idx">{{j}}<br /></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-header">{{__('确认配额信息')}}</div>
            <div class="card-body text-center">
              <p class="card-text" :class="{'text-danger': balance < price}">
                {{__('剩余')}}<b v-show="isFree" class="text-info">{{__('免费配额')}}</b>{{__('数量')}}：<b>{{balance}}</b>，
                {{__('本次测试消耗数量')}}：<b>{{price}}</b>
              </p>
              <button v-show="!formPending" @click="setCreateTaskPid(null)" type="button" class="btn btn-secondary rounded-0">{{__('取消测试')}}</button>
              <button @click="submit" :disabled="formPending" v-if="balance >= price" type="button" class="btn btn-primary rounded-0">
                {{ formPending ? __('加载中') : __('提交测试')}}
              </button>
            </div>
          </div>
          <div v-show="created" class="py-5 text-center">
            <h4>{{__('您的测试已提交')}}</h4>
            <p>
              {{__('测试完成后会邮件通知您，请及时查收邮件，')}}<br/>
              {{__('您可以在`任务管理`查看测试进度。')}}
            </p>
            <button @click="(setCreateTaskPid(null), $router.push('/detect/task'))" type="button" class="btn btn-primary rounded-0">{{__('知道了')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapState, mapActions, mapMutations } from 'vuex'
import { taskTypeList } from '@/config'

export default {
  beforeDestroy () {
    $(this.$el).modal('hide')
  },
  data: () => ({
    price: taskTypeList[0].price,
    type: taskTypeList[0].name,
    taskTypeList,
    formError: null,
    created: null
  }),
  computed: {
    ...mapState('task', {
      pkgid: state => state.createTaskPid,
      formPending: state => state.status === 'create',
      isFree: state => state.balance.free,
      balance: state => state.balance.times
    })
  },
  methods: {
    ...mapActions('task', {
      create: 'create',
      getBalance: 'getBalance'
    }),
    ...mapMutations('task', {
      setCreateTaskPid: 'setCreateTaskPid'
    }),
    submit () {
      this.create({
        values: {
          pkid: this.pkgid,
          reanalysis: true,
          disable_dynamic: false,
          disable_resource: false
        },
        callback: (data, error) => {
          if (!(this.formError = error)) {
            this.created = true
            this.$emit('created', data)
          }
        }
      })
    }
  },
  watch: {
    pkgid () {
      this.getBalance({})
      $(this.$el).modal(this.pkgid ? 'show' : 'hide')
      this.created = false
    }
  }
}
</script>

<style>

</style>
