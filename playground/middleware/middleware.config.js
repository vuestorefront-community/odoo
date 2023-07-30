module.exports = {
  integrations: {
    odoo: {
      location: '@erpgap/odoo-sdk-api-client/server',
      configuration: {
        odooGraphqlUrl: 'https://vsfdemo15.labs.odoogap.com/graphql/vsf'
      },
    },
  },
};
