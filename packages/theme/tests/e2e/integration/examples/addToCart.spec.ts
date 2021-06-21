
it('Should add item to cart', () => {
  let title = null;
  cy.visit('http://localhost:3000');
  cy.get('[data-cy=app-header-top-categories]:nth-child(1)').click();
  cy.get('[data-cy=category-product-card]:nth-child(1) > [data-testid=product-link] .sf-product-card__title')
    .then(html => {
      title = html;
    });
  cy.get('[data-cy=category-product-card]:nth-child(1) [data-testid=product-add-icon]').click();

  cy.get('[data-cy=category-product-card]:nth-child(1) [data-testid=product-add-icon]', { timeout: 1000 }).toMatchSnapshot();
  cy.get('.sf-badge--number')
    .should('have.html', '1');

  cy.get('.sf-badge--number').click();

  cy.get('.sf-collected-product__title')
    .should('have.html', title);
});

