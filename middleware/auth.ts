import useUserAuth from '~/composables/userAuth'

export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserAuth()
  console.log(loggedIn)
  if (loggedIn.value && to.path === '/login') {
    return navigateTo('/')
  }
})
