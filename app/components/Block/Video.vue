<script setup lang="ts">
import type { Video } from "@/types/Video";

const headerHeight = useState("headerHeight");
const { video } = defineProps<{ video: Video }>();

const videoEl = useTemplateRef<HTMLVideoElement>("video");
const caption = ref<string | null>(null);

const toSeconds = (time: string): number => {
  const [hours = 0, minutes = 0, seconds = 0] = time.split(":").map(Number);

  return hours * 3600 + minutes * 60 + seconds;
};

const updateTime = () => {
  const currentCaption = video.subtitles.find((subtitle) => {
    const currentTime = videoEl.value?.currentTime;
    return (
      currentTime &&
      currentTime >= toSeconds(subtitle.start_time) &&
      currentTime <= toSeconds(subtitle.end_time)
    );
  });
  caption.value = currentCaption?.content || null;
};
</script>
<template>
  <div class="block-video relative w-full">
    <video
      :id="video.anchor"
      ref="video"
      class="size-full rounded-xs object-cover"
      autoplay
      muted
      loop
      playsinline
      @timeupdate="updateTime"
    >
      <source :src="video.video_file.url" type="video/mp4" >
      Your browser does not support the video tag.
    </video>

    <RichText
      v-if="caption"
      :content="caption"
      class="absolute top-1/2 left-1/2 w-full -translate-1/2 px-12"
    />
  </div>
</template>

<style scoped>
@reference '@/assets/styles/main.css';

.block-video {
  height: calc(100vh - 1.25rem - v-bind("headerHeight"));

  :deep(h2) {
    @apply font-bodoni text-center text-5xl leading-tight text-white uppercase md:mx-auto md:w-200 md:text-7xl;
  }

  :deep(h3),
  :deep(blockquote) {
    @apply font-bodoni text-center text-3xl leading-[1em] text-white md:mx-auto md:w-310 md:text-5xl;
  }

  :deep(blockquote + p) {
    @apply mt-4 text-center font-bold text-white uppercase md:text-xl;
  }
}
</style>
