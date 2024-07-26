// https://nuxt.com/docs/api/configuration/nuxt-config
import { currentLocales } from './config/i18n'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '~/styles/main.css'
  ],
  i18n: {
    locales: currentLocales,
    langDir: 'locales',
    defaultLocale: 'en',
    vueI18n: './config/i18n.config.ts'
  }
})
