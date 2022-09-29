describe('empty spec', () => {
  it('show empty cart page', () => {
    cy.visit('/')

    cy.get('.header-bottom-wrapper a.cart-link')
      .click();

    cy.url().should('contain', '/cart');

    cy.get('.cart-page-wrapper h1')
      .should('be.visible')
      .and('have.text', 'Your basket');

    cy.get('.cart-empty-content-top p')
      .should('be.visible')
      .and('contain', 'Your basket is empty.');

    cy.get('.cart-page-wrapper .continue-shopping a')
      .click();

    cy.url().should('eq', Cypress.config().baseUrl);
  })

  it('show cart page', () => {
    cy.visit('/')

    cy.get('.book-carousel-wrapper.bestselling').should('be.visible');

    cy.get('.book-carousel-wrapper.bestselling .ant-carousel .books-page .book-item-wrapper .actions button.primary')
      .eq(2)
      .click();
    
    cy.get('.book-carousel-wrapper.topRated .ant-carousel .books-page .book-item-wrapper .actions button.primary')
      .eq(1)
      .click()
      .click();

    cy.get('.header-bottom-wrapper .cart-link')
      .should('be.visible')
      .and('contain', '38,10');

    cy.get('.header-bottom-wrapper a.cart-link')
      .should('be.visible')
      .and('contain', '3')
      .click();

    cy.url().should('contain', '/cart');

    cy.get('.cart-page-wrapper h1')
      .should('be.visible')
      .and('have.text', 'Your basket');

    cy.get('.cart-top-content-wrapper p')
      .first()
      .should('be.visible')
      .and('contain', 'You have 3 items for a total of')
      .and('contain', '38,10');

    cy.get('.cart-main-details-wrapper .book-details-wrapper')
      .should('be.visible')
      .should('have.length', 2);

    cy.get('.cart-main-details-wrapper .book-details-wrapper .book-details-description-wrapper .title')
      .first()
      .should('have.text', 'The Pillars of the Earth');
    cy.get('.cart-main-details-wrapper .book-details-wrapper .book-details-description-wrapper .price')
      .first()
      .should('contain', '11,20');


    cy.get('.cart-main-details-wrapper .book-details-wrapper .book-details-description-wrapper .title')
      .eq(1)
      .should('have.text', 'Orientalism');
    cy.get('.cart-main-details-wrapper .book-details-wrapper .book-details-description-wrapper .price')
      .eq(1)
      .should('contain', '13,45');

    cy.get(':nth-child(2) > .price-qty-details-wrapper > .price')
      .should('contain', '11,20');

    cy.get(':nth-child(3) > .price-qty-details-wrapper > .price')
      .should('contain', '26,90');

    cy.get('.cart-total-wrapper .highlight')
      .should('be.visible')
      .and('contain', '38,10');

    cy.get('.cart-page-wrapper .book-carousel-wrapper').should('be.visible');
    cy.get('.cart-page-wrapper .book-carousel-wrapper .ant-carousel .slick-list .slick-track')
      .children().should('have.length', 5);
    cy.get('.cart-page-wrapper .book-carousel-wrapper .ant-carousel .books-page')
      .children().should('have.length', 14);


    // Test dynamic functionality
    cy.get('.cart-page-wrapper .book-carousel-wrapper .ant-carousel .books-page .book-item-wrapper .actions .primary')
      .eq(3).click();

    cy.get('.cart-main-details-wrapper .book-details-wrapper')
      .should('be.visible')
      .should('have.length', 3);
    
    cy.get('.cart-total-wrapper .highlight')
      .should('be.visible')
      .and('not.contain', '38,10');

    cy.get(':nth-child(4) > .price-qty-details-wrapper > .remove')
      .click();

    cy.get('.cart-main-details-wrapper .book-details-wrapper')
      .should('be.visible')
      .should('have.length', 2);
    
    cy.get('.cart-total-wrapper .highlight')
      .should('be.visible')
      .and('contain', '38,10');
  })
})