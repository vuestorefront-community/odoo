import { integrationPlugin } from '@vue-storefront/odoo';

const odooBaseUrl = 'https://vsfdemo.labs.odoogap.com/';
const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

moduleOptions.odooBaseUrl = odooBaseUrl;
moduleOptions.graphqlBaseUrl = `${odooBaseUrl}graphql/vsf`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
export default integrationPlugin(({ app, integration }) => {
  integration.configure({
    app,
    ...moduleOptions
    // other options
  });
});
