# Custom queries

## Introduction
Following the [Extending GraphQL Queries](https://docs.vuestorefront.io/v2/composition/extending-graphql-queries.html)
,we can override the base queries from odoo to our custom queries.




#### <span style="color:#4f56d6">Import the customQueries file to middleware</span>

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

#### <span style="color:#4f56d6">Custom queries file must follow</span>

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

#### <span style="color:#4f56d6">Reload application and pass the custom query on the composable search method</span>
