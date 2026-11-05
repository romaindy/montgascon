<script setup lang="ts">
import type { Content } from "@/types/Content";

defineProps<Content>();
</script>

<template>
  <section class="block-content my-22 md:my-32">
    <RichText :content="content" />
  </section>
</template>
