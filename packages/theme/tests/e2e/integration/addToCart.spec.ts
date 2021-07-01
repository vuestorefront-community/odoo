
context('Add itens to cart from categories page', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/odoo/getCategory', { fixture: 'categoryMocksData.json' });
  });

  it('Should add item to cart', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=app-header-top-categories]:nth-child(1)').click();
    cy.get('[data-cy=category-product-card]:nth-child(1) > [data-testid=product-link] .sf-product-card__title')
      .then(element => {
        const title = element.text();

        cy.get('[data-cy=category-product-card]:nth-child(1) [data-testid=product-add-icon]').click();

        cy.get('.sf-badge--number')
          .should('have.html', '1');

        cy.get('.sf-badge--number').click();

        cy.get('.sf-collected-product__title')
          .should('contain.html', title.replaceAll('\n', '').trim());
      });

  });

  it('Should add item to cart twice but does not increment', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=app-header-top-categories]:nth-child(1)').click();

    cy.get('[data-cy=category-product-card]:nth-child(1) [data-testid=product-add-icon]').click();

    cy.get('[data-cy=category-product-card]:nth-child(1) [data-testid=product-add-icon]').click();

    cy.get('.sf-badge--number')
      .should('have.html', '1');

    cy.get('[data-testid="sf-quantity-selector input"]')
      .should('have.html', '1');

  });
});

