// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  css: [
    '~/styles/main.css'
  ],
  i18n: {
    vueI18n: './config/i18n.config.ts'
  }
})
