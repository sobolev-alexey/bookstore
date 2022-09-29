describe('empty spec', () => {
  it('shows header', () => {
    cy.visit('/')

    cy.get('.header-wrapper')
      .should('be.visible');

    cy.get('.free-delivery')
      .should('be.visible')
      .and('have.text', 'Free delivery worldwide')

    cy.contains('.header-bottom-wrapper .cart-link', '0,00 €')
      .should('be.visible')
  })

  it('shows banner', () => {
    cy.visit('/')

    cy.get('.banner-carousel-wrapper')
      .should('be.visible');
  })

  it('shows bookshelf', () => {
    cy.visit('/')

    cy.get('.book-carousel-wrapper.bestselling').should('be.visible');
    cy.get('.book-carousel-wrapper.topRated').should('be.visible');
    cy.get('.book-carousel-wrapper.newReleases').should('be.visible');
    cy.get('.book-carousel-wrapper.nonfiction').should('be.visible');
    cy.get('.book-carousel-wrapper.fiction').should('be.visible');
    cy.get('.book-carousel-wrapper.tech').should('be.visible');
    cy.get('.book-carousel-wrapper.philosophy').should('be.visible');
    cy.get('.book-carousel-wrapper.science').should('be.visible');

    cy.get('.book-carousel-wrapper.bestselling .ant-carousel .books-page')
      .children().should('have.length', 14);

    cy.get('.book-carousel-wrapper.topRated .ant-carousel .slick-track')
      .children().should('have.length', 15);

    cy.get('.book-carousel-wrapper.newReleases .ant-carousel .books-page')
      .children().should('have.length', 14);

    cy.get('.book-carousel-wrapper.nonfiction .ant-carousel .slick-track')
      .children().should('have.length', 19);

    cy.get('.book-carousel-wrapper.fiction .ant-carousel .books-page')
      .children().should('have.length', 14);

    cy.get('.book-carousel-wrapper.tech .ant-carousel .slick-track')
      .children().should('have.length', 13);
      
    cy.get('.book-carousel-wrapper.philosophy .ant-carousel .books-page')
      .children().should('have.length', 14);

    cy.get('.book-carousel-wrapper.science .ant-carousel .slick-track')
      .children().should('have.length', 9);
  })
})