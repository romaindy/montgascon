<script setup lang="ts">
const route = useRoute();
const slug = (route.params.slug as string) || "home";

const { findOne } = useWordPress();

const { data: page } = await findOne("pages", slug);

if (!page?.value) {
  throw createError({
    status: 404,
    statusText: "Page Not Found",
  });
}

const headerHeight = useState("headerHeight");

useYoastSEO(page.value);
</script>
<template>
  <main class="px-2.5 text-sm leading-[1.7] md:px-5">
    <DynamicBlocks
      v-for="(content, index) of page.acf?.content"
      :key="index"
      :content="content"
    />
  </main>
</template>

<style scoped>
main {
  padding-top: v-bind("headerHeight");
}
</style>
