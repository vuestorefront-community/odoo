# Custom queries

## Introduction
Following the [Extending GraphQL Queries](https://docs.vuestorefront.io/v2/composition/extending-graphql-queries.html)
,we can override the base queries from odoo to our custom queries.




#### <span style="color:#E38748; font-weight: 400;">Import the customQueries file to middleware</span>

```js
// middleware.config.js
const customQueries = require('./custom-project-api/customQueries');

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

#### <span style="color:#E38748; font-weight: 400;">Custom queries file must follow</span>

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
