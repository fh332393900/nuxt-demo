<template>
  <AppHeader />
  <main
    class="flex-1 p-4 bg-gray-100 dark:bg-black loggedOut"
  >
    <slot />
  </main>
  <AppFooter />
</template>

<style scoped>
.loggedOut {
  min-height: calc(100vh - 146px);
}
</style>
