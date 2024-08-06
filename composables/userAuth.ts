export default function useUserAuth () {
  const cookie = useCookie('auth._token.local')
  console.log(cookie)
  const loggedIn = computed(() => {
    return cookie.value
  })
  const user = {}

  function clear () {
    cookie.value = ''
  }

  return {
    loggedIn,
    user,
    clear
  }
}
