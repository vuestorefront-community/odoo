// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['tslib', '@apollo/client', '@apollo/client/core', '@vue/apollo-composable', '@vue/apollo-option', 'ts-invariant', 'vue-toastification', '@erpgap/odoo-sdk-api-client']
  },
})
