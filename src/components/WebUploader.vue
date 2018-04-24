<template>
  <div>
    <div id="filePicker"></div>
    <div class="upload-error text-danger mb-4"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import { __ } from '../i18n'

window.__uploadFaildXhr = window.__uploadFaildXhr || []
let uploader = null
const initFileUploader = (currUser, callback) => {
  const chunkSize = 5 * 1024 * 1024
  const labelText = __('上传安卓应用，开始测试')
  let currFileMd5 = null
  let $uploadError = null
  let $uploadLabel = null

  window.WebUploader.Uploader.register({
    name: 'checkMergePlugin',
    'before-send-file': 'beforeSendFile',
    'before-send': 'beforeSend',
    'after-send-file': 'afterSendFile'
  }, {
    beforeSendFile (file) {
      $uploadLabel.css({'z-index': 1, opacity: 0.65, 'min-width': $uploadLabel.siblings('div').width()}).text(__('正在处理...'))
      $uploadError.text('')
      let deferred = $.Deferred()
      uploader.md5File(file, 0, 10 * 1024 * 1024)
        // .progress((percentage) => null)
        .then((md5) => {
          currFileMd5 = md5
          deferred.resolve()
        })
      return deferred.promise()
    },
    beforeSend (block) {
      let deferred = $.Deferred()
      $.ajax({
        type: 'POST',
        url: '/upload/v1/checkChunk',
        data: {
          fileMd5: currFileMd5,
          chunk: block.chunk,
          chunkSize: block.end - block.start
        },
        complete: (xhr, status) => {
          if (xhr.responseJSON && xhr.responseJSON.ifExist === 1) {
            deferred.reject() // 分块存在
          } else {
            deferred.resolve()
          }
        }
      })
      this.owner.options.formData.fileMd5 = currFileMd5
      return deferred.promise()
    },
    afterSendFile (file) {
      let chunksTotal = Math.ceil(file.size / chunkSize)
      let deferred = $.Deferred()
      $.ajax({
        type: 'POST',
        url: '/upload/v1/mergeChunk',
        data: {
          fileMd5: currFileMd5,
          chunksTotal: chunksTotal,
          ext: file.ext
        },
        complete: (xhr, status) => {
          deferred.resolve()
          uploader.reset()
          $uploadLabel.css({'z-index': 0, opacity: 1}).text(labelText)
          if (xhr.responseJSON.code === 0) {
            if (typeof callback !== 'undefined') {
              callback(xhr.responseJSON.data)
              $uploadError.text('')
            }
          } else {
            window.__uploadFaildXhr.push(xhr)
            $uploadError.text((xhr.responseJSON && xhr.responseJSON.msg) || __('上传失败'))
          }
        }
      })
    }
  })

  const inst = window.WebUploader.create({
    pick: {
      id: '#filePicker',
      label: labelText,
      multiple: false
    },
    formData: {
      'UPLOAD-JSON': encodeURIComponent(JSON.stringify({
        projectId: currUser.pid,
        uid: currUser.uid,
        sid: currUser.sid,
        bizCode: 3,
        expiretime: -1
      }))
    },
    auto: true, // 自动上传
    timeout: 0, // 不超时
    swf: '/webuploader/Uploader.swf',
    chunked: true, // 分片上传
    chunkSize: chunkSize, // 每片10M
    chunkRetry: 1,
    threads: 3, // 上传并发数,如果多线程，服务端要进行同步控制
    server: '/upload/v1/upload',
    accept: {
      title: __('只接受apk文件'),
      extensions: 'apk'
    },
    fileNumLimit: 1, // 限制上传文件数量
    fileSizeLimit: 2048 * 1024 * 1024, // 限制的文件上传大小2GB
    fileSingleSizeLimit: 2048 * 1024 * 1024
  })

  inst.onReady = () => {
    uploader = inst // make sure the uploader is ready
    $uploadError = $('.upload-error', this.el)
    $uploadLabel = $('.webuploader-pick', this.el)
  }

  inst.onUploadProgress = (file, percentage) => {
    $uploadLabel.text(percentage === 1
      ? __('上传完成, 解析中...')
      : `${__('上传中')}: ${Math.ceil(percentage * 100)}%`)
  }

  inst.onError = (type) => {
    uploader.reset()
    let error = null
    switch (type) {
      case 'Q_TYPE_DENIED':
        error = __('只接受apk文件')
        break
      case 'Q_EXCEED_SIZE_LIMIT':
        error = __('文件大小超出2GB')
        break
      case 'Q_EXCEED_NUM_LIMIT':
        error = __('一次只能上传一个文件')
        break
    }
    $uploadError.text(error || type)
  }
}

const destroyFileUploader = () => {
  if (uploader) {
    uploader.destroy()
    uploader = null
    window.WebUploader.Uploader.unRegister('checkMergePlugin')
  }
}

export default {
  props: {
    currUser: { type: Object, required: true }
  },
  mounted () {
    initFileUploader(this.currUser, this.onUploaded)
  },
  beforeDestroy () {
    destroyFileUploader()
  },
  methods: {
    onUploaded (data) {
      this.$emit('uploaded', data)
    }
  }
}
</script>

<style>

</style>
