<script setup lang="ts">
import type { Information } from "@/types/Information";

defineProps<{ information: Information }>();
</script>

<template>
  <section
    :id="information.anchor"
    class="block-information my-18 md:mt-13 md:mb-25"
  >
    <h2
      class="font-bodoni mb-14 text-lg font-medium uppercase md:mb-0 md:text-5xl"
    >
      {{ information.title }}
    </h2>

    <div class="mt-10 grid gap-14 md:mt-38 md:grid-cols-2 md:gap-8">
      <div>
        <ul class="list-checked space-y-0.5 md:space-y-2">
          <li
            v-for="(list, index) of information.list"
            :key="index"
            class="text-3xs pl-1 font-medium uppercase md:text-xs"
          >
            {{ list.item }}
          </li>
        </ul>
        <CTA :cta="information.cta" class="mt-8 hidden md:flex" />
      </div>

      <div>
        <ul
          class="grid grid-cols-2 gap-6 whitespace-break-spaces md:grid-cols-3 md:gap-y-9"
        >
          <li
            v-for="(_information, index) of information.information"
            :key="index"
            class="text-3xs max-w-40 font-medium uppercase md:text-xs"
          >
            {{ _information.item }}
          </li>
        </ul>
      </div>

      <CTA :cta="information.cta" class="md:hidden" />
    </div>
  </section>
</template>
