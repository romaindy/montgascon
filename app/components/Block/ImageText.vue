<script setup lang="ts">
import type { ImageText } from "@/types/ImageText";

defineProps<{ imageText: ImageText }>();
</script>

<template>
  <section v-if="imageText" class="block-image-text my-14 md:my-32 md:px-26">
    <div class="grid gap-5 md:grid-cols-2">
      <div v-if="imageText.image">
        <Image
          :image="imageText.image"
          class="aspect-4/3 w-full rounded-xs object-cover md:aspect-square md:max-h-none"
        />
      </div>
      <div class="mt-5 md:mt-0 md:pr-2 md:pl-26">
        <RichText
          :content="imageText.content"
          class="text-xs leading-5 font-medium md:text-sm md:leading-6"
        />
        <CTA :cta="imageText.cta" class="mx-auto mt-11 md:mt-12 md:ml-0" />
      </div>
    </div>
  </section>
</template>
