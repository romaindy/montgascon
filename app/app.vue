<script setup lang="ts">
const { find } = useWordPress();
const { data } = await find<Layout>(`options`);
const layout = useState<Layout>("layout", () => data.value);
</script>
<template>
  <Header v-if="layout" />
  <NuxtPage />
  <ContactForm v-if="layout" />
  <Footer v-if="layout" />
</template>
