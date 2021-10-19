# Configuration

## Middleware
Odoo use graphql and jsonrpc calls 
- graphqlBaseUrl for **graphql**


```js
// packages/theme/middleware.config.js

const odooBaseUrl = process.env.BASE_URL;
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

This environment variables must be configured in .env files (.env_production for build)

``` js
//.env file on root of packages/theme

BASE_URL=https://vsf.odoo.com/

```