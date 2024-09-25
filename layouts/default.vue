<template>
  <AppHeader />
  <main class="p-4 bg-gray-100 dark:bg-black" style="min-height: calc(100vh - 140px);">
    <slot />
  </main>
  <AppFooter />
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
.emoji-canvas {
  width: 200px;
  height: 200px;
  border: 2px solid rgba(163, 163, 163, 0.2);
  border-radius: 1rem;
}
canvas {
  width: 160px;
  height: 160px;
}
.tabs {
  width: 100%;
  padding: 20px 4rem;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(163, 163, 163, 0.2);
}
.tabs-item {
  margin-right: 15px;
  margin-bottom: 12px;
}
.option {
  min-height: 300px;
  margin-top: 20px;
  width: 100%;
  flex-wrap: wrap;
}
.controls {
  padding: 12px 0;
  flex-wrap: wrap;
}
.refrsh {
  cursor: pointer;
  width: 48px;
  min-width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-box-small);
  transition: background-color 0.2s;
}
.refrsh:hover {
  background-color: rgba(221,214,254);
}
.btn {
  display: flex;
  align-items: center;
  margin-left: 14px;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 20px;
  background-color: var(--color-box-small);
  border-radius: 20px;
  transition: background-color 0.2s;
}
.btn span {
  font-weight: 600;
}
.btn:hover {
  background-color: rgba(221,214,254);
}
.white-filter {
  filter: invert(1);
}
</style>
