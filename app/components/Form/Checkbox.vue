<script setup lang="ts">
defineProps<{
  label: string;
  required?: boolean;
}>();
const model = defineModel<boolean>();
</script>

<template>
  <label class="flex gap-4">
    <input
      v-model="model"
      :required="required"
      type="checkbox"
      class="accent-primary relative top-1 md:top-0 md:size-6"
    >
    <small class="block">{{ label }}<span v-if="required">*</span></small>
  </label>
</template>
