<script setup lang="ts">
const links = [
  [{
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: 'List',
    icon: 'i-heroicons-home',
    to: '/list'
  }], [{
    label: 'Setting',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/setting'
  }]
]
</script>

<template>
  <div class="p-4">
    <UVerticalNavigation :links="links" />
  </div>
</template>
