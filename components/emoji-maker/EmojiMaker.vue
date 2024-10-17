<script setup lang="ts">
import type { EmojiSlice } from '@/composables/emojiMaker'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const {
  canvasSize,
  tab,
  tabs,
  selectedIndex,
  images,
  selectedImage,
  getRandom,
  exportImage,
  toSVGBlob,
  draw
} = useEmojiMaker(canvasRef)

const selectTab = (activeTab: EmojiSlice) => {
  tab.value = activeTab
}
const selectOption = (index: number) => {
  selectedIndex[tab.value] = index
  console.log(selectedIndex, 'mmm')
  draw()
}

async function save () {
  const params = {
    data: selectedIndex
  }
  console.log(params)
  const { data } = await $fetch('/api/emoji/create', {
    method: 'POST',
    body: params
  })
  console.log(data)
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="emoji-canvas flex justify-center items-center">
      <canvas ref="canvasRef" :width="canvasSize" :height="canvasSize" />
    </div>
    <div class="controls flex justify-center items-center">
      <div @click="getRandom();draw()">
        <UButton icon="i-ic:round-refresh" square />
      </div>
      <UButton
        class="ml-2"
        :ui="{ rounded: 'rounded-full' }"
        :label="$t('action.exportPNG')"
        @click="canvasRef?.toBlob(exportImage)"
      />
      <UButton
        class="ml-2"
        :ui="{ rounded: 'rounded-full' }"
        :label="$t('action.exportSVG')"
        @click="toSVGBlob().then(exportImage)"
      />
      <UButton @click="save">
        save
      </UButton>
    </div>
    <div class="tabs flex justify-center items-center">
      <SelectButton
        v-for="(item, index) in tabs"
        :key="index"
        class="tabs-item flex justify-center items-center"
        :active="tab === item"
        @click="selectTab(item)"
      >
        <img v-if="selectedImage()[item]" :src="selectedImage()[item]" width="40" height="40" alt="">
      </SelectButton>
    </div>
    <div class="option flex justify-center">
      <SelectButton
        v-for="(item, index) in images[tab]"
        :key="index"
        class="tabs-item flex justify-center items-center"
        :active="selectedIndex[tab] === index"
        @click="selectOption(index)"
      >
        <img v-show="item" :src="item" width="40" height="40" alt="">
      </SelectButton>
    </div>
  </div>
</template>

<style scoped>
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
@media (max-width: 1260px) {
  .tabs {
    padding: 20px 2rem;
  }
  main {
    padding: 40px 3rem;
  }
}
@media (max-width: 800px) {
  .tabs {
    padding: 20px;
  }
  main {
    padding: 40px 20px;
  }
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
