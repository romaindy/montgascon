<script setup lang="ts">
import type { History } from "@/types/History";

const { history } = defineProps<{ history: History }>();
</script>

<template>
  <section
    :id="history.anchor"
    v-horizontal-scroll
    class="horizontal-scroll bg-secondary relative z-60 -mx-2.5 text-white md:-mx-5"
  >
    <div class="horizontal-scroll__viewport">
      <div class="horizontal-scroll__track">
        <article
          class="panel relative md:items-center md:justify-center px-2.5 md:flex md:px-5"
        >
          <p
            class="py-12 text-center text-xs font-bold tracking-widest uppercase md:absolute md:top-15 md:left-5 md:w-25 md:py-0 md:text-left"
          >
            {{ history.section_title }}
          </p>
          <div class="justify-center gap-20 md:flex">
            <h2
              class="font-bodoni max-w-75 text-4xl leading-[0.75] font-medium uppercase md:max-w-150 md:text-7xl"
              v-html="formatText(history.section_one.title)"
            />
            <RichText
              :content="history.section_one.content"
              class="mt-15 text-sm leading-6 font-medium md:mt-0 md:w-89"
            />
          </div>
        </article>

        <article class="panel md:flex md:justify-center md:items-center px-2.5 md:px-5">
          <div class="md:flex md:gap-35 md:relative md:max-h-220 md:h-full">
            <div class="mt-18 flex gap-2.5 md:mt-0">
              <div class="flex-1">
                <Image
                  :image="history.section_two.image_one"
                  class="rounded-xs md:w-153"
                />
              </div>
              <div class="flex-1 md:hidden">
                <Image
                  :image="history.section_two.image_two"
                  class="rounded-xs"
                />
              </div>
            </div>
            <div class="md:mt-31 md:w-99">
              <RichText
                :content="history.section_two.title"
                class="font-bodoni mt-10 w-40 text-4xl font-medium uppercase md:mt-0 md:w-auto md:text-5xl"
              />
              <RichText
                :content="history.section_two.content"
                class="mt-4 text-sm leading-6 font-medium"
              />
              <Image
                :image="history.section_two.image_two"
                class="hidden rounded-xs md:absolute md:bottom-0 md:block md:w-79"
              />
            </div>
          </div>
        </article>

        <article class="panel md:flex md:justify-center md:items-center px-2.5 md:px-5">
          <div class="md:flex  md:gap-35 md:relative md:max-h-220 md:h-full">
            <div
              class="mt-18 flex items-end gap-2.5 md:relative md:mt-0 md:w-123"
            >
              <div class="flex-1">
                <Image
                  :image="history.section_three.image_one"
                  class="rounded-xs md:absolute md:bottom-0 md:w-full"
                />
              </div>
              <div class="flex-1">
                <Image
                  :image="history.section_three.image_two"
                  class="rounded-xs md:hidden"
                />
              </div>
            </div>
            <div class="md:relative md:w-99">
              <Image
                :image="history.section_three.image_two"
                class="hidden rounded-xs md:block md:w-79"
              />
              <RichText
                :content="history.section_three.title"
                class="font-bodoni mt-10 w-60 text-4xl font-medium uppercase md:mt-12 md:w-auto md:text-5xl"
              />
              <RichText
                :content="history.section_three.content"
                class="mt-4 text-sm leading-6 font-medium"
              />
            </div>
          </div>
        </article>

        <article class="panel md:flex md:justify-center md:items-center px-2.5 pb-30 md:px-5 md:pb-0">
          <div class="md:flex md:gap-35 md:relative md:max-h-220 md:h-full">
            <div class="mt-18 md:mt-0 flex items-end gap-2.5">
              <div class="flex-1  md:self-center">
                <Image
                  :image="history.section_four.image_one"
                  class="rounded-xs md:w-123"
                />
              </div>
              <div class="flex-1 md:hidden">
                <Image
                  :image="history.section_four.image_two"
                  class="rounded-xs md:absolute md:bottom-0 md:w-99"
                />
              </div>
            </div>
            <div class="mt-10 md:mt-24 md:w-99">
              <RichText
                :content="history.section_four.title"
                class="mt-18  font-bodoni text-5xl font-medium uppercase"
              />
              <RichText
                :content="history.section_four.content"
                class="mt-4 text-sm leading-6 font-medium"
              />
              <Image
                :image="history.section_four.image_two"
                class="hidden rounded-xs md:absolute md:bottom-0 md:block md:w-99"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.horizontal-scroll {
  @apply md:relative md:h-[calc(100vh_+_var(--hs-scroll-height,0px))];
}

.horizontal-scroll__viewport {
  @apply md:sticky md:top-0 md:h-screen md:min-h-200 md:overflow-hidden;
}

.horizontal-scroll__track {
  @apply md:flex md:h-full md:w-max md:will-change-transform;
}

.horizontal-scroll .panel {
  @apply md:h-full md:shrink-0 md:grow-0 md:basis-[100vw];
}
</style>
