<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  label: string;
  required?: boolean;
}>();

const model = defineModel<string>();
const pristine = ref(true);
</script>

<template>
  <label class="block">
    <textarea
      v-model="model"
      class="focus:border-primary block h-full w-full border border-slate-500 px-4 py-3 text-xs transition placeholder:font-medium placeholder:text-gray-500 focus:outline-none md:text-sm"
      :placeholder="label"
      :required="required"
      v-bind="$attrs"
      @blur="pristine = false"
    />
    <p
      v-if="!pristine"
      class="mt-2 hidden text-xs text-red-700 peer-invalid:block"
    >
      <template v-if="!model"> Veuillez renseigner ce champ. </template>
    </p>
  </label>
</template>
