<script setup lang="ts">
import type { Gallery } from "@/types/Gallery";

defineProps<{ gallery: Gallery }>();
</script>

<template>
  <section :id="gallery.anchor" class="block-gallery">
    <div
      v-if="gallery.layout === '4-square'"
      class="my-2.5 grid grid-cols-2 gap-2.5 md:my-5 md:grid-cols-4 md:gap-5"
    >
      <Image
        v-for="item of gallery.images"
        :key="item.image.src"
        :image="item.image"
        class="aspect-square size-full object-cover"
      />
    </div>
    <div
      v-else-if="gallery.layout === '1x1 - 1x1 - 1x1 - 1x1 | 2x2'"
      class="my-5 grid gap-2.5 md:grid-cols-2 md:gap-5"
    >
      <div class="grid gap-2.5 md:grid-cols-2 md:gap-5">
        <Image
          v-for="item of gallery.images.slice(0, 4)"
          :key="item.image.src"
          :image="item.image"
          class="aspect-square size-full object-cover"
        />
      </div>
      <Image
        :key="gallery.images[4]?.image.src"
        :image="gallery.images[4]?.image"
        class="aspect-square size-full object-cover"
      />
    </div>
    <div
      v-else-if="gallery.layout === '1x1 - 1x1 - 2x1 | 1x2'"
      class="my-5 grid gap-2.5 md:grid-cols-3 md:gap-5"
    >
      <div class="grid gap-2.5 md:col-span-2 md:grid-cols-2 md:gap-5">
        <Image
          v-for="item of gallery.images.slice(0, 3)"
          :key="item.image.src"
          :image="item.image"
          class="aspect-square size-full object-cover md:last:col-span-2 md:last:aspect-2/1"
        />
      </div>
      <Image
        :key="gallery.images[3]?.image.src"
        :image="gallery.images[3]?.image"
        class="aspect-square size-full object-cover md:aspect-1/2"
      />
    </div>
    <div
      v-else-if="gallery.layout === '1x2 | 1x2 | 1x2'"
      class="my-5 grid gap-2.5 md:grid-cols-3 md:gap-5"
    >
      <Image
        v-for="item of gallery.images"
        :key="item.image.src"
        :image="item.image"
        class="aspect-square size-full object-cover md:aspect-1/2"
      />
    </div>
    <div
      v-else-if="gallery.layout === '1x2 | 1x1 - 1x1 | 1x2'"
      class="my-5 grid gap-2.5 md:grid-cols-3 md:gap-5"
    >
      <Image
        :key="gallery.images[0]?.image.src"
        :image="gallery.images[0]?.image"
        class="aspect-square size-full object-cover md:aspect-1/2"
      />
      <div class="grid gap-2.5 md:grid-rows-2 md:gap-5">
        <Image
          v-for="item of gallery.images.slice(1, 3)"
          :key="item.image.src"
          :image="item.image"
          class="aspect-square size-full object-cover"
        />
      </div>
      <Image
        :key="gallery.images[3]?.image.src"
        :image="gallery.images[3]?.image"
        class="aspect-square size-full object-cover md:aspect-1/2"
      />
    </div>
    <div
      v-else-if="gallery.layout === '1x2 | 1x2 | 1x1 - 1x1'"
      class="my-5 grid gap-2.5 md:grid-cols-3 md:gap-5"
    >
      <Image
        v-for="item of gallery.images.slice(0, 2)"
        :key="item.image.src"
        :image="item.image"
        class="aspect-square size-full object-cover md:aspect-1/2"
      />
      <div class="grid gap-2.5 md:grid-rows-2 md:gap-5">
        <Image
          v-for="item of gallery.images.slice(2, 4)"
          :key="item.image.src"
          :image="item.image"
          class="aspect-square size-full object-cover"
        />
      </div>
    </div>
    <div
      v-else-if="gallery.layout === '2x2 | 2x1 - 1x1 - 1x1'"
      class="my-5 grid gap-2.5 md:grid-cols-2 md:gap-5"
    >
      <Image
        :key="gallery.images[0]?.image.src"
        :image="gallery.images[0]?.image"
        class="aspect-square size-full object-cover"
      />
      <div class="grid gap-2.5 md:grid-rows-2 md:gap-5">
        <Image
          :key="gallery.images[1]?.image.src"
          :image="gallery.images[1]?.image"
          class="aspect-square size-full object-cover md:aspect-2/1"
        />
        <div class="grid gap-2.5 md:grid-cols-2 md:gap-5">
          <Image
            v-for="item of gallery.images.slice(2, 4)"
            :key="item.image.src"
            :image="item.image"
            class="aspect-square size-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
