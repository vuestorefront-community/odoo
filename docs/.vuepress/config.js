const { description } = require('../../package')

module.exports = {
  title: 'Vue Storefront 2 for Odoo',
  base: '/',
  description: description,
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
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
  plugins: [
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/plugin-medium-zoom',
      {
        // This selector excludes images from the "Integrations" page
        selector: 'main :not(.tile-image) > img'
      }
    ],
    '@vuepress/active-header-links',
    '@vuepress/search'
  ],
  themeConfig: {
    repo: 'https://github.com/vuestorefront-community/odoo/',
    editLinks: true,
    docsDir: 'docs',
    docsBranch: 'develop',
    editLinkText: 'Edit this page',
    logo: 'https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png',
    nav: [
      {
        text: 'Demo',
        link: 'https://vsf.labs.odoogap.com/',
      },
      { text: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      { text: 'GitHub', link: 'https://github.com/vuestorefront-community/odoo'},
      { text: 'Core Documentation', link: 'https://docs.vuestorefront.io/v2/' },
    ],
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          '/essentials/configuration',
          '/essentials/maintainers'
        ]
      },
      {
        title: 'Guides',
        collapsable: true,
        children: [
          '/guides/imageHandle',
          '/guides/customQueries',
          '/guides/customApis',
          '/guides/payment'
        ]
      },
      {
        title: 'Composables',
        collapsable: true,
        children: [
          ['/composables/useCart', 'useCart'],
          ['/composables/useCategory', 'useCategory'],
          ['/composables/useFacet', 'useFacet'],
          ['/composables/useProduct', 'useProduct'],
          ['/composables/useShipping', 'useShipping'],
          ['/composables/useUser', 'useUser'],
          ['/composables/useUserBilling', 'useUserBilling'],
          ['/composables/useWishlist', 'useWishlist'],
          ['/composables/useOrder', 'useOrder'],
          ['/composables/usePassword', 'usePassword'],
          ['/composables/useProductVariant', 'useProductVariant'],
          ['/composables/useCountrySearch', 'useCountrySearch'],
          ['/composables/customQueries', 'customQueries'],
        ]
      },
      {
        title: 'Tips',
        collapsable: true,
        children: [
          ['/tips/customTypes', 'Custom types'],
          ['/tips/i18n', 'i18n'],
        ]
      },{
        title: 'Reference',
        children: [
          ['/api/featureList', 'Feature List'],
          ['/api/apiList', 'Api List'],
          
        ]
      },
    ],
  },
}
