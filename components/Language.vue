<script setup lang="ts">
const { locales, locale, setLocaleCookie } = useI18n()

function changeLanguage (item: any) {
  locale.value = item.code
  setLocaleCookie(locale.value)
}
</script>

<template>
  <UDropdown :items="[locales]" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UButton
      icon="i-heroicons:language-16-solid"
      color="gray"
      variant="ghost"
      aria-label="Theme"
    />
    <template #item="{ item }">
      <div
        class="truncate text-left w-full"
        :class="{ 'text-primary': locale === item.code }"
        @click="changeLanguage(item)"
      >
        {{ item.name }}
      </div>
    </template>
  </UDropdown>
</template>

<style socped>
.active {
  color: var(--primary);
}
</style>
