<script setup lang="ts">
import type { Cover } from "@/types/Cover";

const { cover } = defineProps<{ cover: Cover }>();

const cursor = "url(" + cover.cursor?.src + ")";
</script>

<template>
  <section :id="cover.anchor" class="block-cover mb-5 py-5">
    <NuxtLink
      v-if="cover.link"
      :to="cover.link.url"
      class="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden"
    >
      <Image
        :image="cover.image"
        sizes="100vw"
        class="absolute -z-10 size-full rounded-xs object-cover"
      />
      <div
        v-if="cover.link"
        class="font-bodoni px-12 text-4xl font-bold text-white uppercase md:text-8xl"
      >
        {{ cover.link.title }}
      </div>

      <button
        class="text-3xs mt-2 flex w-full max-w-50 items-center justify-center gap-2.5 rounded-xs border border-white px-5.5 py-2 font-medium tracking-widest text-white uppercase transition md:hidden"
      >
        Voir
      </button>
    </NuxtLink>
  </section>
</template>

<style>
@reference "@/assets/styles/main.css";
.block-cover {
  @apply relative overflow-hidden;
  height: calc(100vh - 1.25rem);

  a {
    @apply relative;
    &:before {
      @apply absolute inset-0 -z-1 block size-full bg-black/40 content-[''];
    }
    &:hover {
      cursor:
        v-bind("cursor") 16 16,
        pointer;
    }
  }
}
</style>
