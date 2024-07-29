<script setup lang="ts">
const { loggedIn, clear, user } = useUserSession()
const items = [
  [{
    slot: 'account',
    disabled: true
  }], [{
    label: 'action.settings',
    icon: 'i-heroicons-cog-8-tooth'
  }], [{
    label: 'action.sign_out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => {
      clear()
    }
  }]
]
</script>

<template>
  <UButton
    v-if="!loggedIn"
    to="/api/auth/github"
    icon="i-simple-icons-github"
    label="Login with GitHub"
    color="black"
    external
  />
  <UDropdown v-else :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UAvatar :src="`https://github.com/${(user as any).login}.png`" />

    <template #account>
      <div class="text-left">
        <p>
          {{ $t('appInfo.signed_in_as') }}
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ (user as any).login }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ $t(item.label) }}</span>

      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>
</template>
