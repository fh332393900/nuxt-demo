<script lang="ts" setup name="AppFooter">
const { buildDate } = useAppConfig()
const buildTimeDate = new Date(buildDate)
const views = ref(0)
console.log(buildTimeDate, 'buildTimeDate')
const getViews = async () => {
  const res: number = await $fetch('/api/views', {
    method: 'GET'
  })
  views.value = res
}

getViews()
</script>

<template>
  <footer>
    <div class="app-info text-primary-500 dark:text-primary-400">
      <span>{{ 'dev' }}</span>
      &middot;
      <span :title="String(buildTimeDate)">{{ $t("appInfo.built_at", [buildTimeDate]) }}</span>
      &middot;
      <NuxtLink class="version hover:underline" :href="`https://github.com/fh332393900/emoji-maker-vue/releases`">
        v{{ '0.1.14' }}
      </NuxtLink>
    </div>
    <div class="author-info flex justify-center align-center text-gray-500 dark:text-gray-400">
      <div class="name">
        Copyright © 2022 - 2024
        <NuxtLink href="https://stevenfeng.cn" class="hover:underline" target="_blank">
          Steven Feng
        </NuxtLink>
      </div>
      <div style="margin: 0 12px;">
        |
      </div>
      <NuxtLink href="https://github.com/fh332393900/emoji-maker-vue" class="hover:underline" target="_blank">
        Github
      </NuxtLink>
      <div style="margin: 0 12px;">
        |
      </div>
      <div class="views">
        {{ $t('appInfo.views') }}{{ views }}
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 24px;
}
.app-info {
  text-align: center;
}
.app-info span,.version {
  font-style: italic;
  font-weight: 600;
  font-size: 0.8rem;
}
.author-info,.name {
  font-size: 0.8rem;
  font-weight: 600;
  font-style: italic;
}
.author-info >>> a {
  font-style: italic;
  font-weight: 600;
}
.views {
  font-weight: 600;
  font-style: italic;
}
</style>
