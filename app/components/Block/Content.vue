<script setup lang="ts">
import type { Content } from "@/types/Content";

defineProps<Content>();
</script>

<template>
  <section class="block-content mx-auto my-22 max-w-275 md:my-32">
    <RichText :content="content" />
  </section>
</template>

<style scoped>
@reference '@/assets/styles/main.css';

:deep(h1) {
  @apply mb-16;
}

:deep(h2) {
  @apply text-4xl;
}

:deep() {
  h2,
  h3,
  h4 {
    @apply uppercase;
  }
}
</style>
