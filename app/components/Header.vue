<script setup lang="ts">
const layout = useState<Layout>("layout");

const { header } = layout.value;

const headerHeight = useState("headerHeight");

const headerEl = useTemplateRef("headerRef");

const { currentScroll, scrolledDown } = useScroll();

const isMenuOpened = ref(false);

const headerVisible = computed(() => {
  return (
    headerEl.value &&
    scrolledDown.value &&
    currentScroll.value > headerEl.value.offsetHeight
  );
});

function setHeaderHeight() {
  if (headerEl.value) {
    headerHeight.value = `${headerEl.value.offsetHeight}px`;
  }
}

onMounted(() => {
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", setHeaderHeight);
});
</script>

<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 z-20 w-full bg-white px-2.5 py-3 transition duration-300 md:px-5"
    :class="{
      '-translate-y-[100%]': headerVisible,
    }"
  >
    <div class="flex items-end justify-between">
      <div class="flex-1 pb-4">
        <div
          class="hover:text-primary flex cursor-pointer items-center gap-5 transition"
          @click="isMenuOpened = !isMenuOpened"
        >
          <Icon name="icon:menu" class="!w-10" />
          <span class="hidden text-sm uppercase md:block">Menu</span>
        </div>
      </div>
      <div class="flex-1">
        <NuxtLink to="/">
          <img
            :src="header.logo.url"
            :alt="header.logo.alt"
            class="mx-auto w-49"
          >
        </NuxtLink>
      </div>
      <div class="flex-1" />
    </div>
  </header>
  <Menu v-if="isMenuOpened" @close="isMenuOpened = false" />
  <CTA
    :cta="header.cta"
    class="fixed right-5 z-30 ml-auto hidden bg-white !px-4 !py-2 transition-[top] md:flex"
    :class="{
      'top-14': !headerVisible,
      'top-6': headerVisible,
    }"
  />

  <NuxtLink
    v-if="header.cta?.link"
    :to="header.cta.link.url"
    class="bg-primary fixed bottom-0 left-0 z-100 block w-full py-5 text-center text-xs font-medium tracking-wider text-black uppercase md:hidden"
  >
    {{ header.cta.link.title }}
  </NuxtLink>
</template>
