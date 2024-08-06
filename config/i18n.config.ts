import en from '../locales/en.json'
import zhCN from '../locales/zh-cn.json'
import ja from '../locales/ja.json'
import ko from '../locales/ko.json'
import fr from '../locales/fr.json'
import { currentLocales } from './i18n'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  availableLocales: currentLocales.map(l => l.code),
  fallbackLocale: 'en', // 区配不到的语言就用en
  messages: {
    en,
    'zh-cn': zhCN,
    zh: zhCN,
    ja,
    ko,
    fr
  }
}))
