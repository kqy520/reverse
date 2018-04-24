import $ from 'jquery'
import { __ } from '../i18n'

export const getBalance = (callback) => {
  $.ajax({
    method: 'GET',
    url: '/api/v1/payment/quantity',
    complete: (xhr, status) => {
      if (xhr.status !== 200) {
        callback(null, (xhr.responseJSON && xhr.responseJSON.msg) || __('获取配额出错'))
      } else {
        callback(xhr.responseJSON, null)
      }
    }
  })
}

export const getTaskList = (values, callback) => {
  $.ajax({
    method: 'GET',
    url: `/api/v1/task/tasks?${Object.entries(values).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')}`,
    complete: (xhr, status) => {
      if (xhr.status !== 200) {
        callback(null, (xhr.responseJSON && xhr.responseJSON.msg) || __('获取任务列表出错'))
      } else {
        const data = {
          list: xhr.responseJSON.data || [],
          totalRow: xhr.responseJSON.totalCount,
          totalPage: Math.ceil(xhr.responseJSON.totalCount / values.pageSize)
        }
        callback(data, null)
      }
    }
  })
}

export const create = (values, callback) => {
  $.ajax({
    method: 'POST',
    url: '/api/v1/task/tasks',
    data: values,
    complete: (xhr, status) => {
      if (xhr.status !== 200) {
        callback(null, (xhr.responseJSON && xhr.responseJSON.msg) || __('提测出错'))
      } else {
        callback(xhr.responseJSON, null)
      }
    }
  })
}
