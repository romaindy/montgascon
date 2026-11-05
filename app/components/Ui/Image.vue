<script setup lang="ts">
defineProps<{
  image: {
    src: string;
    alt: string;
  };
}>();
</script>

<template>
  <img :src="image.src" :alt="image.alt" >
</template>
