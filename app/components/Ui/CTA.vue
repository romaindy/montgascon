<script setup lang="ts">
import type { CTA } from "@/types/CTA";

const { cta } = defineProps<{ cta: CTA }>();
</script>

<template>
  <NuxtLink
    v-if="cta?.link"
    :to="cta.link.url"
    :target="cta.link.target"
    class="group hover:text-primary hover:border-primary text-3xs flex w-fit items-center gap-2.5 rounded-xs border px-5.5 py-2 font-medium tracking-widest uppercase transition md:px-7.5 md:py-2.5 lg:text-xs"
  >
    <Icon
      v-if="cta.icon"
      :name="'icon:' + cta.icon"
      class="group-hover:text-primary !block !size-5 transition"
    />
    {{ cta.link.title }}
  </NuxtLink>
</template>
