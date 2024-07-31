<script setup lang="ts">
const { $pwa } = useNuxtApp()
const { t } = useI18n()

const actions = ref()
watchEffect(() => {
  actions.value = [{
    variant: 'solid',
    color: 'primary',
    label: t('action.reload'),
    click: $pwa?.updateServiceWorker
  }, {
    variant: 'outline',
    color: 'primary',
    label: t('action.close'),
    click: $pwa?.cancelPrompt
  }]
})

</script>

<template>
  <ClientOnly>
    <UNotification
      v-if="$pwa?.needRefresh"
      :id="9"
      icon="i-heroicons-check-circle"
      class="pwa-toast"
      :actions="actions"
      :title="$t('appInfo.notification')"
      :description="$t('appInfo.app_update_notice')"
      :timeout="0"
    />
  </ClientOnly>
</template>

<style scoped>
.pwa-toast {
  max-width: 320px;
  position: fixed;
  right: 2rem;
  bottom: 5rem;
  z-index: 1;
  text-align: left;
}
</style>
