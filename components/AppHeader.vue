<script setup lang="ts">
const buildInfo = {
  env: {
    MODE: 'development'
  }
}
</script>

<template>
  <header class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]">
      <h1 class="flex items-center">
        <UIcon name="i-solar:emoji-funny-square-broken" class="text-primary-500 dark:text-primary-400 w-8 h-8" />
        <span class="ml-2 text-primary text-base font-semibold leading-6">Emoji Maker</span>
        <span class="env ml-2 text-gray-500 dark:text-gray-50">{{ buildInfo.env.MODE }}</span>
      </h1>
      <div class="flex items-center">
        <ColorPicker />
        <Language class="mr-2" />
        <DarkMode />
        <Avatar class="ml-2" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.env {
  font-style: italic;
  background-color: var(--color-menu-item);
  font-size: 0.7rem;
  font-weight: 600;
  margin-left: 4px;
  padding: 4px 12px;
  border-radius: 24px;
}
</style>
