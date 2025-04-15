// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["sf-docs-base"],
  compatibilityDate: "2025-04-15",
  sitemap: {
    enabled: false,
  },
  runtimeConfig: {
    public: {
      storefrontUi: true,
      DOCS_EXAMPLES_VUE_PATH: process.env.NUXT_DOCS_EXAMPLES_VUE_PATH,
      DOCS_EXAMPLES_REACT_PATH: process.env.NUXT_DOCS_EXAMPLES_REACT_PATH,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://docs.alokai.com',
      siteName: 'Odoo Alokai Integration Docs',
      siteDescription: 'Fast, easy and powerful integration of Odoo with Alokai',
    },
  },
});