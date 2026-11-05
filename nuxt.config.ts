// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { createResolver } from "nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "fr",
      },
      link: [
        {
          rel: "apple-touch-icon",
          type: "image/png",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        {
          rel: "manifest",
          type: "image/png",
          href: "/favicon/site.webmanifest",
        },
        {
          rel: "mask-icon",
          color: "#5bbad5",
          href: "/favicon/safari-pinned-tab.svg",
        },
        {
          rel: "shortcut icon",
          type: "image/png",
          href: "/favicon/favicon.ico",
        },
      ],
      meta: [
        {
          name: "description",
          content:
            "À deux pas du quartier de Saint Germain des Prés, l'Hôtel de Montgascon vous accueille pour vos évènements d'exception.",
        },
        { name: "msapplication-TileColor", content: "#ffc40d" },
        { name: "msapplication-config", content: "/favicon/browserconfig.xml" },
        { name: "theme-color", content: "#ffffff" },
      ],
    },
  },
  css: ["vue3-select-component/styles", "@/assets/styles/main.css"],
  modules: [
    "@21pixels/nuxt-wordpress",
    "@nuxt/eslint",
    "vue3-carousel-nuxt",
    "@nuxt/icon/module",
  ],
  components: ["@/components", "@/components/Ui"],
  vite: {
    plugins: [tailwindcss()],
  },
  wordpress: {
    baseUrl: "https://montgascon.21pixels.studio",
  },
  icon: {
    customCollections: [
      {
        prefix: "icon",
        dir: resolve("./app/assets/icons"),
      },
    ],
  },
});
