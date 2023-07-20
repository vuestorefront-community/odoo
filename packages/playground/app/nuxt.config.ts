// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  vite: {
      server: {
        fs: {
          strict: false,
          // used to allow importing from outside of the root directory
        }
      }
      
  },

  devtools: {
    enabled: true
  }
})
