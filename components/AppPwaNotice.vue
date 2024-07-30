<script setup lang="ts">
const { $pwa } = useNuxtApp()

// eslint-disable-next-line no-console
console.log($pwa)
const actions = [{
  variant: 'solid',
  color: 'primary',
  label: 'Reload',
  click: $pwa?.updateServiceWorker
}, {
  variant: 'outline',
  color: 'primary',
  label: 'Close',
  click: $pwa?.cancelPrompt
}]
</script>

<template>
  <ClientOnly>
    <UNotification
      v-if="$pwa?.needRefresh"
      :id="9"
      class="pwa-toast"
      :actions="actions"
      title="Notification"
      description="New content available, click on reload button to update."
      :timeout="0"
    />
  </ClientOnly>
</template>

<style scoped>
.pwa-toast {
  max-width: 300px;
  position: fixed;
  right: 20px;
  bottom: 30px;
  z-index: 1;
  text-align: left;
}
</style>
