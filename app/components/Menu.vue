<script setup lang="ts">
import type { Header } from "~/types/Header";

const route = useRoute();
const layout = useState<Layout>("layout");
const { header, social_networks } = layout.value;
const { menu_items: menuItems } = header;

const emit = defineEmits<{
  (e: "close"): void;
}>();

const id = useId();
const initialItem = getCurrentItem();
const currentItem = ref<Header["menu_items"][number] | undefined>(initialItem);

function getCurrentItem() {
  return menuItems?.find(
    (menuItem) =>
      menuItem.link.url.includes(route.hash) ||
      menuItem.link.url === route.hash ||
      "/",
  );
}

onMounted(() => {
  currentItem.value = getCurrentItem();
});

watch(
  () => route.hash,
  () => {
    currentItem.value = getCurrentItem();
    emit("close");
  },
);
</script>

<template>
  <div class="header-menu bg-secondary fixed inset-0 z-100">
    <div
      class="hover:text-primary absolute top-5 left-5 flex cursor-pointer items-center gap-6 text-white transition"
      @click="emit('close')"
    >
      <Icon name="icon:close" class="!size-7" />
      <span class="text-sm uppercase">Fermer</span>
    </div>

    <div class="grid h-full items-stretch md:grid-cols-2">
      <div class="flex items-center justify-center p-5">
        <nav v-scrollspy="'#' + id">
          <ul
            :id="id"
            class="font-bodoni flex flex-col items-center gap-2 text-5xl font-medium text-white uppercase"
          >
            <li
              v-for="item of menuItems"
              :key="item.link.title"
              @mouseenter="currentItem = item"
              @mouseleave="currentItem = initialItem"
            >
              <NuxtLink
                :to="item.link.url"
                :target="item.link.target"
                class="hover:text-primary transition"
                :class="{
                  active:
                    item.link.url === currentItem?.link.url ||
                    initialItem?.link.url === item.link.url,
                }"
                @click="emit('close')"
              >
                {{ item.link.title }}
              </NuxtLink>
            </li>
          </ul>
          <div class="mt-5 flex justify-center gap-2.5">
            <NuxtLink
              :to="social_networks.instagram_url"
              target="_blank"
              class="hover:text-primary hover:border-primary flex size-10 items-center justify-center rounded-full border border-white text-white transition"
            >
              <Icon name="icon:instagram" class="text-base" />
            </NuxtLink>
            <NuxtLink
              :to="social_networks.linkedin_url"
              target="_blank"
              class="hover:text-primary hover:border-primary flex size-10 items-center justify-center rounded-full border border-white text-white transition"
            >
              <Icon name="icon:linkedin" class="text-base" />
            </NuxtLink>
          </div>
        </nav>
      </div>
      <div class="relative hidden md:block">
        <Transition name="image-fade" mode="out-in">
          <img
            :key="currentItem?.image?.url || 'empty'"
            :src="currentItem?.image?.url"
            class="absolute inset-0 h-full w-full object-cover"
          >
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference '@/assets/styles/main.css';

nav {
  a.active {
    @apply text-primary;
  }
}

.image-fade-enter-active,
.image-fade-leave-active {
  transition: opacity 0.35s ease;
}

.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
}

.image-fade-enter-to,
.image-fade-leave-from {
  opacity: 1;
}
</style>
