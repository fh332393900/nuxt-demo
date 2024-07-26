<script setup lang="ts">
const { locales, locale } = useI18n()
console.log(locales, 'locales')

function changeLanguage (item: any) {
  locale.value = item.code
  console.log(locale.value, '=======')
}
</script>

<template>
  <UDropdown :items="[locales]" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UIcon name="i-heroicons:language-16-solid" class="w-6 h-6" />
    <template #item="{ item }">
      <div
        class="truncate text-left w-full"
        :class="{ active: locale === item.code }"
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
