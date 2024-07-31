<script lang="ts" setup name="SelectButton">
type PropsTypes = {
  active: boolean;
};

const props = withDefaults(defineProps<PropsTypes>(), {
  active: false
})
</script>

<template>
  <div
    class="
      h-64
      w-64
      flex
      justify-center
      items-center
      cursor-pointer
      transition-all
      bg-primary-50
      hover:bg-primary-200
      dark:bg-gray-400
      dark:hover:bg-gray-100
      rounded-md
    "
    :class="{'border-2 border-solid border-primary-300 bg-primary-200 dark:bg-gray-100': props.active}"
  >
    <slot />
  </div>
</template>
