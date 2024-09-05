export default function useUserAuth () {
  const cookie = useCookie('auth._token.local')
  console.log(cookie)
  const loggedIn = computed(() => {
    return cookie.value
  })
  const user = useCookie('auth.user.local') as Record<string, any>

  async function login (data: any) {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: data
    })
    user.value = res.user
    return res
  }
  function clear () {
    cookie.value = ''
    user.value = ''
  }

  return {
    loggedIn,
    user,
    login,
    clear
  }
}
