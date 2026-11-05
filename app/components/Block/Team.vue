<script setup lang="ts">
import type { Team } from "@/types/Team";

defineProps<{ team: Team }>();
</script>

<template>
  <section :id="team.anchor" class="block-team md:pt-24">
    <p
      class="mx-auto my-12 w-fit text-xs font-bold tracking-widest uppercase md:m-0 md:hidden md:w-25"
    >
      {{ team.section_title }}
    </p>
    <div
      class="flex flex-col-reverse flex-wrap gap-5 md:flex-row md:flex-nowrap"
    >
      <div class="flex grow flex-col-reverse md:flex-col">
        <div class="items-top flex">
          <p
            class="hidden w-25 text-xs font-bold tracking-widest uppercase md:block"
          >
            {{ team.section_title }}
          </p>
          <hr class="hidden w-full md:block" >
        </div>
        <RichText
          :content="team.content"
          class="m-auto mb-16 self-center text-sm leading-6 font-medium md:m-auto md:w-100"
        />
        <h2
          class="font-bodoni mt-16 mb-4 text-4xl leading-tight font-semibold uppercase md:m-0 md:text-8xl"
        >
          {{ team.title }}
        </h2>
      </div>
      <div class="md:shrink-0 md:basis-158">
        <Image
          :image="team.image"
          class="aspect-square w-full rounded-xs object-cover md:aspect-auto"
        />
      </div>
    </div>
    <div
      class="flex flex-col divide-y divide-gray-200 border-y border-b border-gray-200 py-0 md:mt-40 md:divide-none md:border-black md:py-5"
    >
      <Team v-for="(_team, index) of team.team" :key="index" :team="_team" />
    </div>
  </section>
</template>
