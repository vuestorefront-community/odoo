module.exports = {
  integrations: {
    odoo: {
      location: '@vue-storefront/integration-odoo-api/server',
      configuration: {
        odooGraphqlUrl: 'https://vsfdemo15.labs.odoogap.com/graphql/vsf'
      },
    },
  },
};
