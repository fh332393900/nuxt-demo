<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    <h2>{{ error?.statusMessage ?? '--' }}</h2>
    <UButton label="返回首页" @click="handleError" />
  </div>
</template>
