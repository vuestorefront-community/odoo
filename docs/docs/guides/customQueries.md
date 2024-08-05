# Custom queries

## Introduction
Following the [Extending GraphQL Queries](https://docs.vuestorefront.io/v2/composition/extending-graphql-queries.html), we can override the base queries from odoo to our custom queries.




1. Import the ```custom-project-api/customQueries.js``` file to **middleware.config.js**</span>

```js
// middleware.config.js
const customQueries = require('./custom-project-api/customQueries.js');

module.exports = {
  integrations: {
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl
      },
      customQueries
    }
  }
};

```

2. Custom queries file must follow

```js
// custom-project-api/customQueries.js
module.exports = {
  customGetProduct: ({variables}) => ({
    varialbes,
    query: gql`
      query { 
        product {
          id
          name
        } 
      }
    `,
    variables
  }),

```


::: danger Don't forget to reload the application

The application does not reload automatically after saving the changes in Server Middleware. Due to this, you have to restart the application manually. We are working on enabling Hot Reloading in future updates.

:::
