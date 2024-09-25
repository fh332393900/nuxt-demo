<template>
  <UCard class="content mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
  padding: 40px 6rem;
}
</style>
