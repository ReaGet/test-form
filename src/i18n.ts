import { createI18n } from 'vue-i18n'
import { messages } from './i18n/index'

export default createI18n({
  locale: localStorage.getItem('lang') || import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  messages,
})

export const supportedLocales = import.meta.env.VITE_SUPPORTED_LOCALES.split(",")