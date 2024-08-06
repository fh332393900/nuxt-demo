<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <div>
    <UButton
      :label="$t('action.login')"
      to="/login"
    />

    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ $t('appInfo.login_with') }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>
        <div class="flex justify-center flex-col">
          <UButton
            to="/api/auth/github"
            icon="i-simple-icons-github"
            label="Github"
            size="lg"
            external
            class="mb-4 text-center flex justify-center"
          />
          <UButton
            to="/api/auth/google"
            icon="i-logos:google-icon"
            label="Google"
            color="gray"
            size="lg"
            external
            class="mb-4 text-center flex justify-center"
          />
        </div>
        <Placeholder class="h-32" />
      </UCard>
    </UModal>
  </div>
</template>
