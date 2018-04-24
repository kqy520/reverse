import $ from 'jquery'
import { __ } from '../i18n'

export const login = (values, callback) => {
  $.ajax({
    method: 'POST',
    url: '/api/v1/account/login',
    data: values,
    complete: (xhr, status) => {
      if (xhr.status !== 200) {
        callback(null, (xhr.responseJSON && xhr.responseJSON.msg) || __('登录出错'))
      } else {
        callback(xhr.responseJSON, null)
      }
    }
  })
}

export const logout = (callback) => {
  $.ajax({
    method: 'GET',
    url: '/api/v1/account/logout',
    complete: (xhr, status) => {
      if (xhr.status !== 200) {
        callback(null, (xhr.responseJSON && xhr.responseJSON.msg) || __('注销出错'))
      } else {
        callback(xhr.responseJSON, null)
      }
    }
  })
}

export const getInfo = (callback) => {
  $.ajax({
    method: 'GET',
    url: '/api/v1/account/user',
    complete: (xhr, status) => {
      if (xhr.status !== 200) {
        callback(null, (xhr.responseJSON && xhr.responseJSON.msg) || __('获取用户信息出错'))
      } else {
        callback(xhr.responseJSON, null)
      }
    }
  })
}

export const resetPwd = (values, callback) => {
  $.ajax({
    method: 'PUT',
    url: '/api/v1/account/reset',
    data: {
      oldpwd: values.oldpwd,
      newpwd: values.password
    },
    complete: (xhr, status) => {
      if (xhr.status !== 200) {
        callback(null, (xhr.responseJSON && xhr.responseJSON.msg) || __('修改密码出错'))
      } else {
        callback(xhr.responseJSON, null)
      }
    }
  })
}

export const sendMail = (callback) => {
  $.ajax({
    method: 'PUT',
    url: '/api/v1/account/mail/verification',
    complete: (xhr, status) => {
      if (xhr.status !== 200) {
        callback(null, (xhr.responseJSON && xhr.responseJSON.msg) || __('发送邮件出错'))
      } else {
        callback(xhr.responseJSON, null)
      }
    }
  })
}

export const validateMail = (code, callback) => {
  $.ajax({
    method: 'GET',
    url: `/api/v1/account/mail/verification?mail=${code}`,
    complete: (xhr, status) => {
      if (xhr.status !== 200) {
        callback(null, (xhr.responseJSON && xhr.responseJSON.msg) || __('验证邮箱出错'))
      } else {
        callback(xhr.responseJSON, null)
      }
    }
  })
}
