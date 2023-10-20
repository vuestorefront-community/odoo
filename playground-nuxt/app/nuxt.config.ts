// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/devtools'],
  runtimeConfig:{
    public: {
      middlewareUrl: '',
      middlewarePort: 8181,
      odooImageUrl: ''
    }
  },
  build: {
    transpile: ['tslib', '@apollo/client', '@apollo/client/core', '@vue/apollo-composable', '@vue/apollo-option', 'ts-invariant', 'vue-toastification', '@erpgap/odoo-sdk-api-client']
  },
  devtools: {
    enabled: true
  }
})
