module.exports = {
  title: 'Odoo',
  base: '/',
  description: 'Documentation for the odoo connector for Vue Storefront 2',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
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
    repo: 'https://github.com/vuestorefront-community/odoo',
    editLinks: true,
    docsDir: 'docs',
    docsBranch: 'develop',
    editLinkText: 'Edit this page',
    logo: 'https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png',
    nav: [
      { text: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      { text: 'Core Documentation', link: 'https://docs.vuestorefront.io/v2/' },  
    ],
    sidebar: [
      {
        title: 'Introduction',
        collapsable: false,
        children: [   
          ['/','Odoo'],
          ['/introduction/demo', 'Demonstration'],          
          ['/introduction/quick-start/starting-new', 'New project'],  
          ['/introduction/quick-start/testing-local', 'Integration test'],  
        ]
      },  
      {
        title: 'Configuration',
        collapsable: false,
        children:[
          ['/configuration/assets', 'Assets'],
          ['/configuration/docker-compose', 'Docker Compose'],
          ['/configuration/eco', 'Ecosystem'],
          ['/configuration/envs', 'Enviroment'],
          ['/configuration/middleware', 'Middleware'],
          ['/configuration/routes', 'Routes'],
        ]
      },
      {
        title: 'Guides',
        collapsable: true,
        children:[
          ['/guides/customApis', 'Custom Apis'],
          ['/guides/customQueries', 'Custom queries'],
          ['/guides/payment', 'Payment']          
        ]
      },
      {
        title: 'Composables',
        collapsable: true,
        children:[
          ['/composables/customQueries', 'customQueries'],
          ['/composables/useCart', 'useCart'],
          ['/composables/useCategory', 'useCategory'],
          ['/composables/useFacet', 'useFacet'],  
          ['/composables/useShipping', 'useShipping'],
          ['/composables/useShippingProvider', 'useShippingProvider'],
          ['/composables/useUser', 'useUser'],
          ['/composables/useUserBilling', 'useUserBilling'],
          ['/composables/useWishlist', 'useWishlist'],
          ['/composables/useOrder', 'useOrder'],   
          ['/composables/usePassword', 'usePassword'],
          ['/composables/useProductVariant', 'useProductVariant'],
          ['/composables/useCountrySearch', 'useCountrySearch']         
        ]
      }         
    ]
  }
}
