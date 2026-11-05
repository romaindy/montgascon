<script setup lang="ts">
defineProps<{
  type?: string;
  label?: string;
  required?: boolean;
  readonly?: boolean;
  max?: number;
}>();

const pristine = ref(true);
const model = defineModel<string | number>();
</script>

<template>
  <label class="group relative block">
    <span
      class="absolute -top-3 text-xs font-medium text-gray-500 transition group-has-[:placeholder-shown]:top-2 md:group-has-[:placeholder-shown]:text-sm"
      >{{ label }}
    </span>
    <input
      v-model="model"
      :type="type || 'text'"
      class="peer focus:border-primary w-full border-b border-slate-500 py-1 transition focus:outline-none"
      :required="required"
      :readonly="readonly"
      placeholder=" "
      :max="max"
      @blur="pristine = false"
    >
    <p
      v-if="!pristine"
      class="mt-2 hidden text-xs text-red-600 peer-invalid:block"
    >
      <template v-if="!model"> Veuillez renseigner ce champ. </template>
      <template v-else> Cette valeur est incorrect. </template>
    </p>
  </label>
</template>
<style></style>
