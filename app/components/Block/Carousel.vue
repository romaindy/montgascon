<script setup lang="ts">
import type { Carousel } from "@/types/Carousel";
import type { CarouselConfig } from "vue3-carousel";

defineProps<{ carousel: Carousel }>();

const currentSlide = ref(0);
const hoveredSlide = ref<number | null>(null);

function onPointerMove(event: PointerEvent) {
  const element = event.currentTarget as HTMLElement;
  const { clientX, clientY } = event;
  const slides = Array.from(
    element.querySelectorAll<HTMLElement>(".carousel__slide"),
  );
  const hovered = slides.find((slide) => {
    const rect = slide.getBoundingClientRect();
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  });
  const index =
    hovered?.querySelector<HTMLElement>("[data-slide-index]")?.dataset
      .slideIndex;
  hoveredSlide.value = index === undefined ? null : Number(index);
}

const carouselConfig: CarouselConfig = {
  itemsToShow: 1.2,
  itemsToScroll: 1,
  snapAlign: "center",
  wrapAround: true,
  gap: 10,
  breakpoints: {
    768: {
      snapAlign: "start",
      wrapAround: false,
      itemsToShow: 3,
      itemsToScroll: 3,
      gap: 20,
      adaptiveHeight: false,
    },
  },
};
</script>

<template>
  <section
    v-if="carousel"
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
      v-model="currentSlide"
      :i18n="{
        ariaNextSlide: undefined,
        ariaPreviousSlide: undefined,
      }"
      class="-mx-2.5 mt-15 md:mx-auto md:px-34"
      @pointermove="onPointerMove"
      @pointerleave="hoveredSlide = null"
    >
      <Slide
        v-for="(item, index) in carousel.items"
        :id="slugify(item.title)"
        :key="item.title"
      >
        <div :data-slide-index="index">
          <Image :image="item.image" class="h-56 w-full object-cover" />
          <h3
            class="mt-6 mb-2 text-center text-lg leading-6 font-semibold uppercase"
          >
            {{ item.title }}
          </h3>
          <p
            class="text-center text-sm font-medium transition duration-800"
            :class="{
              'max-md:opacity-0': currentSlide !== index,
              'max-md:opacity-100': currentSlide === index,
              'md:opacity-0': hoveredSlide !== index,
              'md:opacity-100': hoveredSlide === index,
            }"
          >
            {{ item.content }}
          </p>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination :paginate-by-items-to-show="true" />
      </template>
    </Carousel>

    <div class="text-primary mt-4 text-center font-semibold md:hidden">
      {{ currentSlide + 1 }} / {{ carousel.items.length }}
    </div>
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
    @apply bottom-0 hidden md:flex;

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
}
</style>
