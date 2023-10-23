# Middleware

## GraphQl

As a nuxt application, all requests to backend are made from Nuxt using a middleware layer.

Odoo use GraphQL in back end. So, we need to use a middleware to convert the graphql to rest api. For more detailed explanation visit [Graphql documentation]("https://graphql.org/").

The ```middleware.config.js``` is responsable to make this bridge between Nuxt and GraphQl.


```js
// packages/theme/middleware.config.js
const odooBaseUrl =
  process.env.BACKEND_BASE_URL ||
  process.env.BASE_URL ||
  "https://vsfdemo.labs.odoogap.com/";
const graphqlBaseUrl = `${odooBaseUrl}graphql/vsf`;

module.exports = {
  integrations: {
    odoo: {
      location: "@vue-storefront/odoo-api/server",
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl,
      },
    },
  },
};
```

## Logging requests

To make our development easier, we created useing Nuxt context, a way to show each request made from Nuxt to Graphql. Its automatic in dev mode, not for production. You'll see in your terminal all the logged requests.


<div align="center">
  <img :src="$withBase('/requestLogger.png')" alt="request_logger" />
</div>
