<template>
  <input
    type="text"
    :value="value | datefmt"
  />
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    value: { type: Date | null, required: true }
  },
  mounted () {
    $(this.$el).datepicker({
      autoclose: true,
      clearBtn: true,
      todayHighlight: true,
      format: 'yyyy-mm-dd',
      language: 'zh-CN'
    }).on('changeDate', (e) => {
      this.$emit('input', e.date || null)
    })
  }
}
</script>

<style>

</style>
