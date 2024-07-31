<template>
  <div class="content mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl bg-white dark:bg-gray-600">
    <ClientOnly>
      <EmojiMaker />
    </ClientOnly>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px 6rem;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px var(--un-shadow-color, rgba(0,0,0,0.25));
}
</style>
