<template>
  <div>
    {{ count }}
  </div>
</template>

<script lang="ts" setup>

const count = ref<number>(0)

count.value += 1

const getHello = async () => {
  const res = await $fetch('/api/hello', {
    method: 'POST'
  })
  console.log(res, '21')
}

getHello()

</script>
