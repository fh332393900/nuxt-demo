// Detect based on query, cookie, header
export default defineI18nLocaleDetector((event, config) => {
  // try to get locale from query
  const query = tryQueryLocale(event, { lang: '' }) // disable locale default value with `lang` option
  if (query) {
    return query.toString()
  }

  // try to get locale from cookie
  const cookie = tryCookieLocale(event, { lang: 'ja', name: 'i18n_redirected' }) // disable locale default value with `lang` option
  console.log(cookie.toString(), '----')
  // console.log(useCookieLocale(), '000000000')
  if (cookie) {
    return cookie.toString()
  }

  // try to get locale from header (`accept-header`)
  const header = tryHeaderLocale(event, { lang: '' }) // disable locale default value with `lang` option
  console.log(header, '===')
  if (header) {
    return header.toString()
  }

  // If the locale cannot be resolved up to this point, it is resolved with the value `defaultLocale` of the locale config passed to the function
  return config.defaultLocale
})
