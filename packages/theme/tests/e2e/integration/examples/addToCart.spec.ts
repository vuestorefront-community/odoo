
it('Should add item to cart', () => {
  cy.visit('http://localhost:3000');
  cy.get('[data-cy=app-header-top-categories]:nth-child(1)').click();
  cy.get('[data-cy=category-product-card]:nth-child(1) > [data-testid=product-link] .sf-product-card__title')
    .then(html => {
      const title = html;
    });
  cy.get('[data-testid=product-add-icon]:nth-child(1)').click();

});

