<script setup lang="ts">
defineProps<{
  label: string;
  required?: boolean;
}>();
const model = defineModel<string | number>();
</script>

<template>
  <label class="flex gap-4">
    <input v-model="model" type="checkbox" class="accent-primary size-6" >
    <small class="block">{{ label }}<span v-if="required">*</span></small>
  </label>
</template>
<style></style>
