import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'Alokai + Odoo (docs)',
  description: 'My first VuePress Site',
  theme: defaultTheme({    
    nav: [
      { text: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      { text: 'Core Documentation', link: 'https://docs.vuestorefront.io/v2/' },  
    ],    
    sidebar: [      
      {        
        text: 'Introduction',   
        collapsable: false,    
        children: [          
          {
            text: 'Odoo',
            link: '/',
            children: [
              {
                text: 'Demonstration',
                link: 'introduction/demo'
              },
              {
                text: 'New Project',
                link: '/introduction/quick-start/starting-new'
              },
              {
                text: 'Integration Test',
                link: '/introduction/quick-start/testing-local'
              },
            ],
          },
          {
            text: 'Configuration',
            collapsible: false,            
            children: [
              {
                text: 'Assets',
                link: '/configuration/assets'
              },
              {
                text: 'Docker Compose',
                link: '/configuration/docker-compose'
              },
              {
                text: 'Ecosystem',
                link: '/configuration/eco'
              },
              {
                text: 'Enviroment',
                link: '/configuration/envs'
              },
              {
                text: 'Middleware',
                link: '/configuration/middleware'
              },
              {
                text: 'Routes',
                link: '/configuration/routes'
              },
            ],
          },
          {
            text: 'Guides',
            collapsable: true,            
            children: [
              {
                text: 'Custom Apis',
                link: '/guides/customApis'
              },
              {
                text: 'Custom queries',
                link: '/guides/customQueries'
              },
              {
                text: 'Payment',
                link: '/guides/payment'
              },
            ],
          },          
        ],
      },      
    ],
  }),

  bundler: viteBundler(),
})
