<template>
  <div class="jumbotron text-center bg-transparent">
    <h1 class="display-2">404</h1>
    <p class="lead">{{__('您访问的资源不存在，请检查URL地址')}}</p>
    <hr class="my-4">
    <p>{{__('进入首页')}} ({{ timer }}s)</p>
    <p class="lead">
      <a class="btn btn-primary btn-lg" href="/">{{__('返回首页')}}</a>
    </p>
  </div>
</template>

<script>
export default {
  created () {
    this.timerId = setInterval(() => {
      --this.timer
      if (this.timer === 0) {
        clearInterval(this.timerId)
        window.location.href = '/'
      }
    }, 1000)
  },
  beforeDestory () {
    clearInterval(this.timerId)
  },
  data: () => ({
    timerId: null,
    timer: 5
  })
}
</script>

<style>

</style>
