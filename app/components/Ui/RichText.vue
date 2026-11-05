<script setup lang="ts">
defineProps<{
  content: string;
}>();
</script>

<template>
  <div v-html="formatText(content)" />
</template>

<style scoped>
@reference '@/assets/styles/main.css';

:deep(h1) {
  @apply font-bodoni mx-auto text-4xl leading-[0.75] font-medium uppercase md:max-w-290 md:text-8xl;
}

:deep(h2) {
  @apply font-bodoni mb-4 text-2xl font-medium;
}

:deep(p:not(:last-child)) {
  @apply mb-5 md:mb-6;
}
</style>
