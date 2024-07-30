<script setup lang="ts">
const buildInfo = {
  env: {
    MODE: 'development'
  }
}
</script>

<template>
  <header>
    <h1 class="flex items-center">
      <UIcon name="i-solar:emoji-funny-square-broken" class="mt-1 text-primary-500 dark:text-primary-400 w-5 h-5" />
      <span class="ml-2 text-primary text-base font-semibold leading-6">Emoji Maker</span>
      <span class="env">{{ buildInfo.env.MODE }}</span>
    </h1>
    <div class="btn">
      <ColorPicker />
      <Language class="mr-2" />
      <DarkMode />
      <Avatar class="ml-2" />
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}

.btn {
  display: flex;
  align-items: center;
}

.language {
  position: relative;
  cursor: pointer;
  font-size: 24px;
}

.theme {
  margin-left: 12px;
  cursor: pointer;
}
.white-color {
  color: #fff;
}
.white-filter {
  filter: invert(1);
}
.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  min-width: 10rem;
  background-color: var(--color-menu);
  list-style: none;
  font-size: 14px;
  padding: 12px;
  border-radius: 0.4rem;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  color: var(--color-text);
}
.dropdown-menu li {
  cursor: pointer;
  list-style: none;
  padding: 4px 8px;
  border-radius: 4px;
}
.dropdown-menu li:hover {
  background-color: var(--color-menu-item);
}
.active {
  color: var(--primary);
}
.env {
  font-style: italic;
  background-color: var(--color-menu-item);
  font-size: 0.7rem;
  font-weight: 600;
  margin-left: 4px;
  padding: 4px 12px;
  border-radius: 24px;
}
</style>
