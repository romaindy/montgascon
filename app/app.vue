<script setup lang="ts">
const { find } = useWordPress();
const { data } = await find<Layout>(`options`);
const layout = useState<Layout>("layout", () => data.value);

useNuxtApp().hook("page:transition:finish", () => {
  window.scrollTo({ top: 0, behavior: "instant" });
});
</script>
<template>
  <Header v-if="layout" />
  <NuxtPage />
  <ContactForm v-if="layout" />
  <Footer v-if="layout" />
</template>
