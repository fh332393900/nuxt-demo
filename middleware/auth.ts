import useUserAuth from '~/composables/userAuth'

const routerWhiteList = ['/signup', '/login']

export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserAuth()
  if (loggedIn.value && to.path === '/login') {
    return navigateTo('/')
  }
  if (!loggedIn.value && !routerWhiteList.includes(to.path)) {
    return navigateTo('/')
  }
})
