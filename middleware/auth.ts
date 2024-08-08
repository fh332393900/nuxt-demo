import useUserAuth from '~/composables/userAuth'

export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserAuth()
  if (loggedIn.value && to.path === '/login') {
    return navigateTo('/')
  }
})
