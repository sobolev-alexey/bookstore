describe('empty spec', () => {
  it('performs search', () => {
    cy.visit('http://localhost:1234')

    cy.get('.header-wrapper .header-search-wrapper #search-form_query')
      .should('be.visible');
    
    cy.get('.header-wrapper .header-search-wrapper #search-form_query')
      .type('rowling');
    cy.get('button.search').click();

    cy.get('.book-carousel-wrapper.bestselling .ant-carousel .books-page')
      .should('be.visible');

    cy.get('.book-carousel-wrapper.bestselling .ant-carousel .books-page')
      .children().should('have.length', 2);

    cy.get('.book-carousel-wrapper.nonfiction .ant-carousel .slick-track')
      .children().should('have.length', 0);

    // Reset search
    cy.get('.header-search-wrapper span.ant-input-clear-icon').click(); 

    cy.get('.book-carousel-wrapper.bestselling .ant-carousel .books-page')
      .children().should('have.length', 14);

     cy.get('.book-carousel-wrapper.nonfiction .ant-carousel .slick-track')
      .children().should('have.length', 19);
  })
})