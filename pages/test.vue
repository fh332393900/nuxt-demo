<script setup lang="ts">
async function createPeople () {
  const res = await $fetch('/api/user', {
    method: 'POST'
  })
  console.log(res, '===============')
}
</script>

<template>
  <div>
    <UButton label="创建人员" @click="createPeople" />
  </div>
</template>
