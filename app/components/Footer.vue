<script setup lang="ts">
const layout = useState<Layout>("layout");

const { footer, social_networks } = layout.value;
</script>

<template>
  <footer class="bg-secondary border-t border-white/30 p-5 max-md:pb-20">
    <NuxtLink to="/">
      <img
        :src="footer.logo.url"
        :alt="footer.logo.alt"
        class="mx-auto w-55 pt-18 pb-16 md:w-77 md:pt-40"
      >
    </NuxtLink>

    <div
      class="mb-25 text-center text-xs leading-6 font-medium tracking-wider text-white uppercase"
    >
      <RichText :content="footer.content" />
      <RichText :content="footer.label_social_network" class="mt-4" />

      <div class="mt-1 flex justify-center gap-2.5">
        <NuxtLink
          :to="social_networks.instagram_url"
          target="_blank"
          class="hover:text-primary hover:border-primary flex size-10 items-center justify-center rounded-full border border-white transition"
        >
          <Icon name="icon:instagram" class="text-base" />
        </NuxtLink>
        <NuxtLink
          :to="social_networks.linkedin_url"
          target="_blank"
          class="hover:text-primary hover:border-primary flex size-10 items-center justify-center rounded-full border border-white transition"
        >
          <Icon name="icon:linkedin" class="text-base" />
        </NuxtLink>
      </div>
    </div>

    <div
      class="text-2xs flex flex-wrap justify-center font-medium text-white md:flex-nowrap md:justify-between"
    >
      <div>
        <nav>
          <ul class="flex gap-4">
            <li v-for="item of footer.left_menu" :key="item.link.title">
              <NuxtLink :to="item.link.url">
                {{ item.link.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        {{ footer.right_content }}
      </div>
    </div>
  </footer>
</template>
