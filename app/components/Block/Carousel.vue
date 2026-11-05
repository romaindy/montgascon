<script setup lang="ts">
import type { Carousel } from "@/types/Carousel";
import type { CarouselConfig } from "vue3-carousel";

defineProps<{ carousel: Carousel }>();

const carouselConfig: CarouselConfig = {
  itemsToShow: 1,
  itemsToScroll: 1,
  wrapAround: false,
  gap: 20,
  adaptiveHeight: true,
  breakpoints: {
    768: {
      itemsToShow: 3,
      itemsToScroll: 3,
    },
  },
};
</script>

<template>
  <section
    :id="carousel.anchor"
    class="block-carousel pt-7 pb-18 md:border-t md:pt-16 md:pb-34"
  >
    <p
      class="mb-9 text-center text-xs font-bold tracking-widest uppercase md:my-0 md:w-25 md:text-left"
    >
      {{ carousel.section_title }}
    </p>

    <h2
      class="font-bodoni mx-auto my-6 w-75 text-center text-4xl leading-tight font-medium uppercase md:w-auto md:text-5xl"
    >
      {{ carousel.title }}
    </h2>

    <RichText
      :content="carousel.description"
      class="mx-auto text-center text-xs font-medium"
    />

    <Carousel
      v-bind="carouselConfig"
      class="mx-auto mt-15 max-w-5xl px-5 md:px-0"
    >
      <Slide
        v-for="item in carousel.items"
        :id="slugify(item.title)"
        :key="item.title"
      >
        <div>
          <Image :image="item.image" class="h-56 w-full object-cover" />
          <h3
            class="mt-6 mb-4 h-8 text-center text-lg leading-4 font-semibold uppercase"
          >
            {{ item.title }}
          </h3>
          <p class="text-center text-sm font-medium">{{ item.content }}</p>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination :paginate-by-items-to-show="true" />
      </template>
    </Carousel>

    <CTA :cta="carousel.cta" class="mx-auto mt-10" />
  </section>
</template>

<style scoped>
@reference '@/assets/styles/main.css';

.block-carousel {
  --vc-pgn-active-color: var(--color-primary);
  --vc-pgn-background-color: var(--color-primary);
  --vc-pgn-border-radius: 9999px;
  --vc-pgn-width: 7px;
  --vc-pgn-height: 7px;

  @media (width > 768px) {
    --vc-nav-height: 100%;
    --vc-nav-width: 50%;
  }

  :deep(.carousel__slide) {
    align-items: start;
  }

  :deep(.carousel__pagination) {
    @apply -top-9 bottom-auto;

    .carousel__pagination-item .carousel__pagination-button--active {
      @apply w-6;
    }
  }

  :deep(.carousel__icon) {
    display: none;
  }

  :deep(.carousel__prev) {
    cursor:
      url('data:image/svg+xml,<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32.5" cy="32.5" r="32.5" transform="matrix(-1 0 0 1 65 0)" fill="%23BF9855"/><g clip-path="url(%23clip0_886_350)"><path d="M41.8496 32.166H23.8702" stroke-width="2" stroke-miterlimit="10" stroke="%231D1D1B"/><path d="M25.0093 32.166C28.7132 32.166 31.7227 29.1565 31.7227 25.4526" stroke-width="2" stroke-miterlimit="10" stroke="%231D1D1B"/><path d="M25.0093 32.166C28.7132 32.166 31.7227 35.1754 31.7227 38.8793" stroke-width="2" stroke-miterlimit="10" stroke="%231D1D1B"/></g><defs><clipPath id="clip0_886_350"><rect width="17.9794" height="13.4267" fill="white" transform="matrix(-1 0 0 1 41.8496 25.4526)"/></clipPath></defs></svg>'),
      auto;
  }

  :deep(.carousel__next) {
    cursor:
      url('data:image/svg+xml,<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32.5" cy="32.5" r="32.5" fill="%23BF9855"/><g clip-path="url(%23clip0_886_350)"><path d="M23.1504 32.166H41.1298" stroke-width="2" stroke-miterlimit="10" stroke="%231D1D1B"/><path d="M39.9907 32.166C36.2868 32.166 33.2773 29.1565 33.2773 25.4526" stroke-width="2" stroke-miterlimit="10" stroke="%231D1D1B"/><path d="M39.9907 32.166C36.2868 32.166 33.2773 35.1754 33.2773 38.8793" stroke-width="2" stroke-miterlimit="10" stroke="%231D1D1B"/></g><defs><clipPath id="clip0_886_350"><rect width="17.9794" height="13.4267" fill="white" transform="translate(23.1504 25.4526)"/></clipPath></defs></svg>'),
      auto;
  }

  :deep(.carousel__prev.carousel__prev--disabled),
  :deep(.carousel__next.carousel__next--disabled) {
    cursor: initial;
  }
}
</style>
