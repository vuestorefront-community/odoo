const { description } = require('../../package')

module.exports = {
  title: null,
  base: '/',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  configureWebpack: (config) => {
    config.module.rules = config.module.rules.map(rule => ({
      ...rule,
      use: rule.use && rule.use.map(useRule => ({
        ...useRule,
        options: useRule.loader === 'url-loader' ?
          /**
            Hack for loading images properly.
            ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
           */
          {  ...useRule.options, esModule: false } :
          useRule.options
      }))
    }))
  },
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
      { text: 'GitHub', link: '<% YOUR REPOSITORY URL %>'},
      { text: 'Core Documentation', link: 'https://docs.vuestorefront.io/v2/' },
      { text: 'Roadmap', link: '<% YOUR ROADMAP URL %>'}
    ],
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          '/essentials/configuration',
          '/essentials/feature_list',
          '/essentials/payment',
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
          ['/composables/useOrder', 'useOrder'],
          ['/composables/customQueries', 'customQueries'],
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
