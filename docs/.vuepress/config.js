const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: null,
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: '/assets/logo.png',
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Demo',
        link: 'https://vsf.labs.odoogap.com/',
      },
      { text: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      { text: 'Core Documentation', link: 'https://docs.vuestorefront.io/v2/' }
    ],
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          '/essentials/configuration',
          '/essentials/feature_list',
          '/essentials/maintainers'
        ]
      },
      {
        title: 'Composables',
        collapsable: false,
        children: [
          ['/composables/useCart', 'useCart'],
          ['/composables/useCategory', 'useCategory'],
          ['/composables/useCountrySearch', 'useCountrySearch'],
          ['/composables/useFacet', 'useFacet'],
          ['/composables/usePassword', 'usePassword'],
          ['/composables/useProduct', 'useProduct'],
          ['/composables/useProductVariant', 'useProductVariant'],
          ['/composables/useShipping', 'useShipping'],
          ['/composables/useUser', 'useUser'],
          ['/composables/useUserBilling', 'useUserBilling'],
          ['/composables/useWishlist', 'useWishlist'],
        ]
      }
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
