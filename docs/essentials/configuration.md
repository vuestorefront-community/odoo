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

# Backend base url will point for a private address if required internal access
# don't need to pass it unless you need a private access to the endpints
# export BACKEND_BASE_URL=https://vsf.odoogap.com/

# Public path should be defined on production for CDN access
# export PUBLIC_PATH=https://xyz.cloudfront.cdn.com

# Redis server for cache
export REDIS_HOST=<redis_host>
export REDIS_PORT=<redis_port>
# export REDIS_PASSWORD=<redis_password>
```

## Image handle
Always use the **getImage** method!

#### WHY ? 
- He is build to fetch from correct baseURL (CDN for production / odoo others)
- He is already injected in vue

#### HOW ?

```ts
   // from template
   $image(productGetters.getCoverImage(product))
   $image( image url )

   // from setup
   { url: root.$image(img.small) }


```

#### Assets
The assets folder on build stagging / prod will be sent to CDN with some hash.

To nuxt compile the assets links with the rigth use require.

```ts
  :placeholder="require('~/assets/images/product/product_placeholder.png')"
```  
