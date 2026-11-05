<script setup lang="ts">
defineProps<{
  label: string;
  required?: boolean;
}>();

const input = defineModel<string>();
</script>

<template>
  <label class="block">
    <textarea
      v-model="input"
      class="focus:border-primary block h-full w-full border border-slate-500 px-4 py-3 text-xs transition placeholder:font-medium placeholder:text-gray-500 focus:outline-none md:text-sm"
      :placeholder="label"
      :required="required"
    />
  </label>
</template>
