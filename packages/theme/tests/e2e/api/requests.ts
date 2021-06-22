
import categoryMocks from '../fixtures/categoryMocksData.json';

const requests = {
  getCategories (): Cypress.Chainable {
    const options = {
      url: '/api/odoo/getCategory',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: categoryMocks
    };
    return cy.request(options);
  }
};

export default requests;
