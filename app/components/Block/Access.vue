<script setup lang="ts">
import type { Access } from "@/types/Access";

defineProps<{ access: Access }>();
</script>

<template>
  <section
    :id="access.anchor"
    class="block-access md:relative md:pt-45 md:pb-37"
  >
    <p
      class="my-15 text-center text-xs font-bold tracking-widest uppercase md:absolute md:my-0 md:w-25 md:text-left"
    >
      {{ access.section_title }}
    </p>

    <RichText
      :content="access.title"
      class="font-bodoni mx-auto max-w-92 text-center text-4xl leading-tight font-medium uppercase md:max-w-244 md:text-left md:text-8xl"
    />

    <div
      class="mt-8 mb-6 grid items-center gap-8 md:mx-auto md:mt-22 md:mb-0 md:max-w-244 md:grid-cols-2 md:gap-40"
    >
      <Image
        :image="access.map"
        class="mx-auto w-68 rounded-full md:m-0 md:w-125"
      />

      <div class="text-center md:text-left">
        <RichText :content="access.content" />

        <div class="mt-4 flex justify-center gap-2.5 md:justify-start">
          <NuxtLink
            v-for="button of access.buttons"
            :key="button.image.url"
            :to="button.url"
            :target="button.new_tab ? '_blank' : undefined"
          >
            <Image :image="button.image" class="!block !size-9" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
