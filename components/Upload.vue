<script setup lang="ts">
const files = ref()
const emit = defineEmits(['changeFile'])
const uploadInputRef = ref()

function uploadAvatar (fileList: FileList) {
  files.value = fileList
  const file = files.value[0]
  const fileExt = file.name.split('.').pop()
  const fileName = `${file.name.split('.')[0]}.${fileExt}`
  const filePath = `/avatar/${fileName}`
  emit('changeFile', file, filePath)
}
function open () {
  uploadInputRef.value.input.click()
}
</script>

<template>
  <div>
    <UButton size="xs" icon="i-heroicons-folder" @click="open">
      Choose
    </UButton>
    <UInput
      ref="uploadInputRef"
      class="hidden"
      type="file"
      size="sm"
      icon="i-heroicons-folder"
      @change="uploadAvatar"
    />
  </div>
</template>
