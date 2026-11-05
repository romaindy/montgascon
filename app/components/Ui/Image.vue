<script setup lang="ts">
defineProps<{
  image: {
    src: string;
    srcset: string;
    alt: string;
  };
  sizes?: string;
}>();
</script>

<template>
  <img
    :src="image.src"
    :srcset="image.srcset"
    :alt="image.alt"
    :sizes="sizes"
  >
</template>
