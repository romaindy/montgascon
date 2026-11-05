<script setup lang="ts">
import type { MultiGalleries } from "@/types/MultiGalleries";

defineProps<{ multiGalleries: MultiGalleries }>();

const id = useId();
const menuEl = useTemplateRef("menu");
const menuHeight = ref("0px");

function setMenuHeight() {
  if (menuEl.value) {
    menuHeight.value = `${menuEl.value.offsetHeight}px`;
  }
}

onMounted(() => {
  setMenuHeight();
  window.addEventListener("resize", setMenuHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", setMenuHeight);
});
</script>

<template>
  <section
    :id="multiGalleries.anchor"
    class="block-multi-galleries pt-15 md:pt-44"
  >
    <h2
      class="font-bodoni text-center text-4xl font-medium uppercase md:text-8xl"
    >
      {{ multiGalleries.title }}
    </h2>

    <Icon
      name="icon:separator"
      class="text-primary mx-auto mt-4 !block !size-6 md:!size-9"
    />

    <nav
      ref="menu"
      v-scrollspy="'#' + id"
      class="sticky top-0 z-10 overflow-y-auto bg-white py-5 md:mt-34"
    >
      <ul :id="id" class="flex gap-6">
        <li
          v-for="gallery in multiGalleries.galleries"
          :key="gallery.menu_title"
          class="text-xs font-bold tracking-widest uppercase"
        >
          <a
            class="block border-b-2 border-transparent pt-3.5 pb-3 whitespace-nowrap"
            :href="'#' + slugify(gallery.menu_title)"
          >
            {{ gallery.menu_title }}
          </a>
        </li>
      </ul>
    </nav>

    <div class="flex flex-col gap-2.5 md:gap-5">
      <Carousel
        v-for="gallery in multiGalleries.galleries"
        :id="slugify(gallery.menu_title)"
        :key="gallery.menu_title"
        :wrap-around="true"
        class="block-multi-galleries__gallery"
      >
        <Slide v-for="image in gallery.images" :key="image.src">
          <img
            :src="image.src"
            :alt="image.alt"
            class="block-multi-galleries__image w-full rounded-xs object-cover"
          >
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<style scoped>
@reference '@/assets/styles/main.css';

.block-multi-galleries {
  --vc-pgn-active-color: var(--color-primary);
  --vc-pgn-background-color: white;
  --vc-pgn-border-radius: 9999px;
  --vc-pgn-width: 7px;
  --vc-pgn-height: 7px;

  @media (width > 768px) {
    --vc-nav-height: 100%;
    --vc-nav-width: 50%;
  }

  nav {
    a.active {
      @apply text-primary border-primary;
    }
  }

  .block-multi-galleries__gallery {
    scroll-margin-top: 0.625rem;

    @media (width > 768px) {
      scroll-margin-top: calc(v-bind("menuHeight"));
    }
  }

  .block-multi-galleries__image {
    @media (width > 768px) {
      height: calc(100vh - v-bind("menuHeight") - 1.25rem);
    }
  }

  :deep(.carousel__pagination) {
    @apply bottom-5 left-5 transform-none;

    .carousel__pagination-item .carousel__pagination-button--active {
      @apply w-6;
    }
  }

  :deep(.carousel__icon) {
    display: none;
  }

  :deep(.carousel__prev) {
    cursor:
      url('data:image/svg+xml,<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32.5" cy="32.5" r="32.5" transform="matrix(-1 0 0 1 65 0)" fill="white"/><g clip-path="url(%23clip0_886_350)"><path d="M41.8496 32.166H23.8702" stroke-width="2" stroke-miterlimit="10" stroke="%231D1D1B"/><path d="M25.0093 32.166C28.7132 32.166 31.7227 29.1565 31.7227 25.4526" stroke-width="2" stroke-miterlimit="10" stroke="%231D1D1B"/><path d="M25.0093 32.166C28.7132 32.166 31.7227 35.1754 31.7227 38.8793" stroke-width="2" stroke-miterlimit="10" stroke="%231D1D1B"/></g><defs><clipPath id="clip0_886_350"><rect width="17.9794" height="13.4267" fill="white" transform="matrix(-1 0 0 1 41.8496 25.4526)"/></clipPath></defs></svg>'),
      auto;
  }

  :deep(.carousel__next) {
    cursor:
      url('data:image/svg+xml,<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32.5" cy="32.5" r="32.5" fill="white"/><g clip-path="url(%23clip0_886_350)"><path d="M23.1504 32.166H41.1298" stroke-width="2" stroke-miterlimit="10" stroke="%231D1D1B"/><path d="M39.9907 32.166C36.2868 32.166 33.2773 29.1565 33.2773 25.4526" stroke-width="2" stroke-miterlimit="10" stroke="%231D1D1B"/><path d="M39.9907 32.166C36.2868 32.166 33.2773 35.1754 33.2773 38.8793" stroke-width="2" stroke-miterlimit="10" stroke="%231D1D1B"/></g><defs><clipPath id="clip0_886_350"><rect width="17.9794" height="13.4267" fill="white" transform="translate(23.1504 25.4526)"/></clipPath></defs></svg>'),
      auto;
  }

  :deep(.carousel__prev.carousel__prev--disabled),
  :deep(.carousel__next.carousel__next--disabled) {
    cursor: initial;
  }
}
</style>
