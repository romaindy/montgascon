<script setup lang="ts">
import type { Content } from "@/types/Content";
import type { ImageText } from "@/types/ImageText";
import type { Video } from "@/types/Video";
import type { MultiGalleries } from "@/types/MultiGalleries";
import type { Cover } from "@/types/Cover";
import type { Information } from "@/types/Information";
import type { Carousel } from "@/types/Carousel";
import type { Team } from "@/types/Team";
import type { Access } from "@/types/Access";

type ACFBlock<T> = T & { acf_fc_layout: string };

const { content } = defineProps<{
  content: unknown & { acf_fc_layout: string };
}>();
</script>
<template>
  <template v-if="content">
    <BlockVideo
      v-if="content.acf_fc_layout === 'video'"
      :video="content as ACFBlock<Video>"
    />
    <BlockContent
      v-if="content.acf_fc_layout === 'content'"
      :content="(content as ACFBlock<Content>).content"
    />
    <BlockTitle
      v-if="content.acf_fc_layout === 'title'"
      :title="(content as ACFBlock<Title>).title"
    />
    <BlockImageText
      v-if="content.acf_fc_layout === 'image_text'"
      :image-text="content as ACFBlock<ImageText>"
    />
    <BlockSeparator v-if="content.acf_fc_layout === 'separator'" />
    <BlockMultiGalleries
      v-if="content.acf_fc_layout === 'multi_galleries'"
      :multi-galleries="content as ACFBlock<MultiGalleries>"
    />
    <BlockInformation
      v-if="content.acf_fc_layout === 'information'"
      :information="content as ACFBlock<Information>"
    />
    <BlockCover
      v-if="content.acf_fc_layout === 'cover'"
      :cover="content as ACFBlock<Cover>"
    />
    <BlockCarousel
      v-if="content.acf_fc_layout === 'carousel'"
      :carousel="content as ACFBlock<Carousel>"
    />
    <BlockTeam
      v-if="content.acf_fc_layout === 'team'"
      :team="content as ACFBlock<Team>"
    />
    <BlockHistory
      v-if="content.acf_fc_layout === 'history'"
      :history="content as ACFBlock<History>"
    />
    <BlockAccess
      v-if="content.acf_fc_layout === 'access'"
      :access="content as ACFBlock<Access>"
    />
    <BlockGallery
      v-if="content.acf_fc_layout === 'gallery'"
      :gallery="content as ACFBlock<Gallery>"
    />
  </template>
</template>
