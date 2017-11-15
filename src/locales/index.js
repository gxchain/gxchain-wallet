import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {set_item, get_item} from "@/services/CommonService"

import en from './en'
import zh from './zh'

Vue.use(VueI18n)

const messages = {
  en: en,
  zh: zh
}

const numberFormats = {
  'en': {
    currency: {
      style: 'currency', currency: 'USD',currencyDisplay: 'symbol'
    }
  },
  'zh': {
    currency: {
      style: 'currency', currency: 'CNY', currencyDisplay: 'symbol'
    }
  }
}

const dateTimeFormats = {
  'en': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
    }
  },
  'zh': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  }
}

let locale = get_item('locale') || navigator.language.split('-')[0]
set_item('locale', locale)

export default new VueI18n({
  locale: locale,
  fallbackLocale: 'en',
  numberFormats,
  dateTimeFormats,
  messages
})
