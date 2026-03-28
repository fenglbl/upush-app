import App from './App'
import './uni.promisify.adaptor'
import { createSSRApp } from 'vue'
import apis from '@/common/api/index.js'
import { formatTime, toast } from '@/common/lib/app.js'
import { getLocale, setLocale, t } from '@/common/lib/i18n.js'

export function createApp() {
  const app = createSSRApp(App)

  app.config.globalProperties.$apis = apis
  app.config.globalProperties.$toast = toast
  app.config.globalProperties.$formatTime = formatTime
  app.config.globalProperties.$t = (path) => t(path, getLocale())
  app.config.globalProperties.$getLocale = getLocale
  app.config.globalProperties.$setLocale = setLocale

  return {
    app
  }
}
