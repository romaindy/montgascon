<script setup lang="ts">
import type { Title } from "@/types/Title";

defineProps<Title>();
</script>

<template>
  <section class="block-title mt-12 mb-15 md:mt-25 md:mb-30">
    <h1
      class="font-bodoni mx-auto text-center text-4xl leading-[0.75] font-medium uppercase md:max-w-290 md:text-8xl"
    >
      {{ title }}
    </h1>
  </section>
</template>
