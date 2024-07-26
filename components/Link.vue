<template>
  <a
    :href="props.href"
    :target="props.target"
  >
    <slot />
  </a>
</template>

<script setup lang="ts" name="Link">
type PropsTypes = {
  href: string;
  target: '_blank' | '_parent' | '_self' | '_top' | string | undefined
};

const props = withDefaults(defineProps<PropsTypes>(), {
  href: '',
  target: '_self'
})
</script>

<style scoped>
a {
  text-decoration: none;
  color:inherit;
}
a:hover {
  text-decoration: underline;
  color: var(--primary);
}
</style>
