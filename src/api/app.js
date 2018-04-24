import $ from 'jquery'
import { __ } from '../i18n'

export const getAppList = (values, callback) => {
  $.ajax({
    method: 'GET',
    url: `/api/v1/app/apps?${Object.entries(values).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')}`,
    complete: (xhr, status) => {
      if (xhr.status !== 200) {
        callback(null, (xhr.responseJSON && xhr.responseJSON.msg) || __('获取应用列表出错'))
      } else {
        callback(xhr.responseJSON, null)
      }
    }
  })
}

export const getNameList = (callback) => {
  $.ajax({
    method: 'GET',
    url: '/api/v1/task/app/names',
    complete: (xhr, status) => {
      if (xhr.status !== 200) {
        callback(null, (xhr.responseJSON && xhr.responseJSON.msg) || __('获取应用名称出错'))
      } else {
        callback(xhr.responseJSON, null)
      }
    }
  })
}

export const getVersionList = (appId, callback) => {
  $.ajax({
    method: 'GET',
    url: `/api/v1/task/app/${appId}/versions`,
    complete: (xhr, status) => {
      if (xhr.status !== 200) {
        callback(null, (xhr.responseJSON && xhr.responseJSON.msg) || __('获取应用版本出错'))
      } else {
        callback(xhr.responseJSON, null)
      }
    }
  })
}
