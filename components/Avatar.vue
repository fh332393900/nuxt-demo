<script setup lang="ts">
import useUserAuth from '~/composables/userAuth'

// const { loggedIn, clear, user } = useUserSession()
const { loggedIn, user, clear } = useUserAuth()
console.log(loggedIn, '000000')
console.log(user.value, 'vvvvvvvv')
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
  <LoginModel v-if="!loggedIn" />
  <UDropdown v-else :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UAvatar :src="(user as any)?.avatarUrl || ''" :alt="user?.username" />

    <template #account>
      <div class="text-left">
        <p>
          {{ $t('appInfo.signed_in_as') }}
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ (user as any).username }}
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white text-xs">
          {{ (user as any).email }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ $t(item.label) }}</span>

      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>
</template>
