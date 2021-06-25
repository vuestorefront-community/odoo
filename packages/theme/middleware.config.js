const odooBaseUrl = process.env.BASE_URL;
const database = process.env.DATABASE;
const graphqlBaseUrl = `${odooBaseUrl}graphql/vsf`;

module.exports = {
  integrations: {
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl,
        database
      }

    }
  }
};

