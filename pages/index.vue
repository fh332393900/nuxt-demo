<template>
  <UCard class="content px-4 sm:px-6 lg:px-8">
    <ClientOnly>
      <EmojiMaker />
    </ClientOnly>
  </UCard>
</template>

<style scoped>
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
