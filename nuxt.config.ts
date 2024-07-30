// https://nuxt.com/docs/api/configuration/nuxt-config
import { currentLocales, currentLocaleCodes } from './config/i18n'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-auth-utils',
    '@vite-pwa/nuxt',
    'dayjs-nuxt'
  ],

  css: [
    '~/styles/main.css'
  ],
  colorMode: {
    preference: 'light'
  },
  appConfig: {
    buildDate: new Date().toISOString()
    // ui: {
    //   primary: 'green'
    // }
  },
  runtimeConfig: {
    kvApi: process.env.KV_REST_API_URL,
    kvToken: process.env.KV_REST_API_TOKEN,
    oauth: {
      github: {
        clientId: process.env.NUXT_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET
      },
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET
      }
    }
  },
  pwa: {
    registerType: 'prompt',
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20 // 定时更新 3600-一小时
    }
  },
  dayjs: {
    locales: currentLocaleCodes,
    plugins: ['relativeTime', 'utc', 'timezone', 'localizedFormat'],
    defaultLocale: 'en'
  },
  i18n: {
    locales: currentLocales,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: './config/i18n.config.ts',
    // 启用浏览器语言检测，以便在访问者第一次访问您的站点时自动将其重定向到首选语言环境。
    // nuxt-i18n 会在 cookie 中添加一个用于存储当前语言环境的变量，当我们修改语言时，nuxt-i18n 会更新它
    detectBrowserLanguage: {
      // 启动 cookie
      useCookie: true,
      // 用于存储当前语言环境的变量名
      cookieKey: 'i18n_redirected',
      // (建议用于改进SEO) -仅检测站点根路径(/)上的浏览器区域设置。只有当使用策略而不是“no_prefix”时才有效。
      redirectOn: 'root'
    }
  },

  compatibilityDate: '2024-07-26'
})
