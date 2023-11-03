// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in', // default
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/eslint-module', '@vueuse/nuxt', '@nuxtjs/google-fonts', '@pinia/nuxt'],

  eslint: {
    lintOnStart: false,
  },
  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      'Scheherazade New': true,
      Quicksand: true,
    },
    display: 'swap',
    preload: true,
    download: true,
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
