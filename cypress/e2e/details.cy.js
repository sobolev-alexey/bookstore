describe('empty spec', () => {
  it('show details page', () => {
    cy.visit('/')

    cy.get('.book-carousel-wrapper.bestselling').should('be.visible');

    cy.get('.book-carousel-wrapper.bestselling .ant-carousel .books-page .book-item-wrapper .item-info .title')
      .eq(2)
      .should('have.text', 'The Pillars of the Earth')
      .click();
    
    cy.url().should('contain', 'book/');

    cy.get('.book-details-wrapper .ant-image-img.book-image')
      .should('be.visible');

    cy.get('.book-details-description-wrapper .title')
      .should('be.visible')
      .and('have.text', 'The Pillars of the Earth');

    cy.get('.book-details-description-wrapper .author')
      .should('be.visible')
      .and('contain', 'Ken Follett');

    cy.get('.book-details-description-wrapper .rating')
      .should('be.visible')
      .and('contain', '(3319)');

   cy.get('.book-details-description-wrapper .description')
      .should('be.visible')
      .and('contain', '#1 New York Times Bestseller');

    cy.get('.additional-details-wrapper .product-details-wrapper span')
      .should('be.visible')
      .and('contain', '9781101442197');

    cy.get('.details-page-wrapper .book-carousel-wrapper.similar').should('be.visible');
    cy.get('.details-page-wrapper .book-carousel-wrapper.bestselling').should('be.visible');

    cy.get('.details-page-wrapper .book-carousel-wrapper.bestselling .ant-carousel .slick-list .slick-track')
      .children().should('have.length', 9);

    cy.get('.details-page-wrapper .book-carousel-wrapper.similar .ant-carousel .slick-list .slick-track')
      .children().should('have.length', 5);

    cy.get('.price-details-wrapper .price')
      .should('be.visible')
      .and('contain', '11,20');

    cy.get('.price-details-wrapper button.primary')
      .should('be.visible')
      .click();

    cy.get('.header-bottom-wrapper .cart-link')
      .should('be.visible')
      .and('contain', '11,20');
  })
})