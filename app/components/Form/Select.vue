<script lang="ts" setup>
import { Select } from "vue3-select-component";

const { label, required } = defineProps<{
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
}>();

const model = defineModel<string | null>();
</script>

<template>
  <ClientOnly fallback="Loading...">
    <div class="relative">
      <label class="mb-1">
        <Select
          v-model="model"
          :required="required"
          class="select"
          :placeholder="label"
          :options="options"
        />
      </label>
    </div>
  </ClientOnly>
</template>

<style>
:root,
[data-assembled-select],
[data-select-popover] {
  --vs-border-radius: 0;
  --vs-outline-color: var(--color-primary);
  --vs-padding-x: 1rem;
  --vs-padding-y: 1.2rem;
  --vs-font-size: 0.75rem;
  --vs-border: 1px solid var(--color-gray-500);
  --vs-font-weight: 500;
  --vs-placeholder-color: var(--color-gray-500);
  --vs-option-focused-background-color: white;
  --vs-option-hover-background-color: var(--color-primary);
  --vs-option-selected-background-color: var(--color-primary);

  @media (width > 768px) {
    --vs-font-size: 0.875rem;
  }
}
</style>
