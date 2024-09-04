<script setup lang="ts">
const files = ref()
const emit = defineEmits(['changeFile'])

function uploadAvatar (fileList: FileList) {
  console.log(fileList)
  files.value = fileList
  const file = files.value[0]
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `/avatar/${fileName}`
  emit('changeFile', file, filePath)
}
</script>

<template>
  <div>
    <UButton size="xs" icon="i-heroicons-folder">
      <label for="uploadInput">
        Choose
      </label>
    </UButton>
    <UInput
      id="uploadInput"
      class="hidden"
      type="file"
      size="sm"
      icon="i-heroicons-folder"
      @change="uploadAvatar"
    />
  </div>
</template>
