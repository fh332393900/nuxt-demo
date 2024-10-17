<script setup lang="ts">
import useUserAuth from '~/composables/userAuth'

const { loggedIn } = useUserAuth()
</script>

<template>
  <AppHeader />
  <div class="flex">
    <Menu v-if="loggedIn" />
    <main
      class="flex-1 p-4 bg-gray-100 dark:bg-black"
      :class="{
        loggedIn: loggedIn,
        loggedOut: !loggedIn
      }"
    >
      <slot />
    </main>
  </div>
  <AppFooter v-if="!loggedIn" />
</template>

<style scoped>
.loggedIn {
  min-height: calc(100vh - 64px);
}
.loggedOut {
  min-height: calc(100vh - 146px);
}
</style>
