import * as translations from '../locale/template.json'

const storageKey = 'I18N-UI-LANG'

let _lang = localStorage.getItem(storageKey) || navigator.language

export const getLang = () => _lang

export const setLang = (lang) => {
  if (!translations[lang]) {
    lang = 'zh-CN'
  }
  _lang = lang
  localStorage.setItem(storageKey, _lang || '')
}

export const __ = (key) => {
  return (translations[_lang] ? translations[_lang][key] : null) || key
}

setLang(_lang)
