# Configuration

## Middleware
Odoo use graphql
- graphqlBaseUrl for **graphql**


```js
// packages/theme/middleware.config.js

const odooBaseUrl = process.env.BACKEND_BASE_URL || process.env.BASE_URL || 'https://vsfdemo.labs.odoogap.com/';
const graphqlBaseUrl = `${odooBaseUrl}graphql/vsf`;

module.exports = {
  integrations: {
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl
      }
    }
  }
};

```

## Environment

This environment variables must be used for deployment or used on a dot env file

```bash

# Base Url should target the Odoo server
export BASE_URL=https://vsf.odoo.com/

# development / production
export NODE_ENV=development

# for translations
export NODE_LOCALE=en-EN

# for api
export BASE_URL=https://vsfdemo.labs.odoogap.com/

# for api access through local network (any custom hook on build stage, for example)
export BACKEND_BASE_URL=https://vsfdemo.labs.odoogap.com/

# for CDN url
export PUBLIC_PATH=https://vsf.odoo.com/

# for sitemap host url
export SITE_URL=https://vsf.odoo.com/

# Redis server for cache
export REDIS_HOST=<redis_host>
export REDIS_PORT=<redis_port>
# export REDIS_PASSWORD=<redis_password>
```


#### Assets
The assets folder on build stagging / prod will be sent to CDN with some hash.

To nuxt compile the assets links with the rigth use require.

```ts
  :placeholder="require('~/assets/images/product/product_placeholder.png')"
```  
