<script setup lang="ts">
import type { Team } from "@/types/Team";

defineProps<{ team: Team["team"][number] }>();

const isExpanded = ref(false);
</script>
<template>
  <div
    v-if="team"
    class="team group items-top flex gap-6.25 py-2.5 md:items-start md:py-5"
    :class="{
      'is-expanded': isExpanded,
    }"
    @click="isExpanded = !isExpanded"
  >
    <Image
      :image="team.picture"
      sizes="(max-width: 960px) 5.25rem, 25rem"
      class="transition-linear size-21 shrink-0 rounded-xs object-cover object-top transition-[height] delay-0 duration-800 md:w-100"
      :class="{
        'md:h-62': !isExpanded,
        'md:h-auto': isExpanded,
      }"
    />

    <div
      class="grow pt-6 md:pt-22 md:pr-27.25 md:pl-25 md:group-not-first:border-t"
    >
      <div class="mb-5 flex items-center justify-between md:mb-14">
        <h3
          class="group-hover:text-primary font-bodoni max-w-27 text-lg leading-[1] font-medium md:max-w-66 md:text-5xl"
        >
          {{ team.name }}
        </h3>
        <Icon name="icon:plus" class="mr-5 !size-3 md:!hidden" />
      </div>
      <Transition name="fade" appear>
        <div
          class="grid transition-[grid-template-rows] duration-800"
          :class="{
            'grid-rows-[0fr]': !isExpanded,
            'grid-rows-[1fr]': isExpanded,
          }"
        >
          <div class="min-h-0 overflow-hidden transition-[grid-template-rows]">
            <RichText
              :content="team.content"
              class="text-xs font-medium md:text-sm"
            />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.team {
  cursor:
    url('data:image/svg+xml,<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32.5" cy="32.5" r="32.5" transform="rotate(-180 32.5 32.5)" fill="%23B99536"/><path d="M41 33L23.3457 33" stroke-width="2" stroke="black"/><path d="M32.0996 41.7285L32.0996 24.0742" stroke-width="2" stroke="black"/></svg>'),
    auto;

  &.is-expanded {
    cursor:
      url('data:image/svg+xml,<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32.5" cy="32.5" r="32.5" transform="rotate(-180 32.5 32.5)" fill="%23B99536"/><path d="M41 33L23.3457 33" stroke-width="2" stroke="black"/></svg>'),
      auto;
  }

  .fade-enter-active {
    transition:
      2s ease opacity,
      0.8s ease height !important;
  }

  .fade-leave-active {
    transition:
      0.8s ease opacity,
      0.8s ease height !important;
  }

  .fade-enter-active,
  .fade-leave-active {
    height: auto;
    opacity: 1;
  }

  .fade-enter-from,
  .fade-leave-to {
    height: 0;
    opacity: 0;
  }
}
</style>
