# Custom API client

## Introduction
Following the [Registering an extension](https://docs.vuestorefront.io/v2/integrate/extending-integrations.html#registering-an-extension)
, to create new apis client (doesn't exist in odoo )we must register a new extension.


#### <span style="color:#E38748; font-weight: 400;">Import the customApi file to middleware</span>
```js
// middleware.config.js
const apis = require('./custom-api/api');

module.exports = {
  integrations: {
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl,
        ...
      },
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'custom-apis-extension',
          extendApiMethods: apis
        }
      ]
    }
  }
};

```


#### <span style="color:#E38748; font-weight: 400;">Create your index file to organize your api modules</span>
```js
// custom-api/api/index.js

const createTelegramNotification = require('./createTelegramNotification');
const importCartFromOther = require('./importCartFromOther');

module.exports = {
  createTelegramNotification,
  importCartFromOther
};

```

#### <span style="color:#E38748; font-weight: 400;">Create each of your api module</span>
```js
// custom-api/api/createTelegramNotification.js
const gql = require('graphql-tag');

const createTelegramNotification = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
      mutation ($email: String!) {
        createTelegramNotification(email: $email) {
            status
            ...
        }
      }`
  });
  return response;
};

module.exports = createTelegramNotification;


```

