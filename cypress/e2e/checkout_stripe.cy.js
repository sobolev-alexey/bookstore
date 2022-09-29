describe('empty spec', () => {
  it('show checkout page with stripe', () => {
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

    cy.get('.cart-top-content .action-buttons a').click();

    cy.url().should('contain', '/checkout');

    cy.get('.total').should('contain', '38,10');
    cy.get('.cart-total').should('contain', '3 items');
    cy.get('.summary-body .summary-item:nth-child(5) .price.highlight').should('contain', '38,10');

    cy.get('.checkout-main-column-wrapper .order-wrapper').should('not.exist');
    cy.get('.checkout-main-column-wrapper .steps-wrapper .step')
      .eq(1)
      .should('be.visible')
      .and('contain', '2. Order placed')
      .and('not.have.class', 'active');

    cy.get('.checkout-main-column-wrapper .address-details-wrapper')
      .should('be.visible')

    cy.get('.checkout-main-column-wrapper .payment-details-wrapper')
      .should('be.visible')

    cy.get('.checkout-main-column-wrapper .payment-details-wrapper button.primary')
      .should('be.disabled')

    cy.get('.address-details-wrapper .ant-form-item #name')
      .type('John Smith');
    
    cy.get('.address-details-wrapper .ant-form-item #address1')
      .type('Main street 7');

    cy.get('.address-details-wrapper .ant-form-item #city')
      .type('San Francisco');

    cy.get('.address-details-wrapper .ant-form-item #state')
      .type('California');
    
    cy.get('.address-details-wrapper .ant-form-item #postcode')
      .type('94110');

    cy.get('.payment-details-wrapper .ant-form-item #stripe-form_cardholder')
      .type('John');

    cy.get('.payment-details-wrapper .ant-form-item #stripe-form_email')
      .type('a@a.com');
    

    // Pre-fill Stripe payment form within iframe
    cy.getWithinIframe('[name="cardnumber"]').type('4242424242424242');
    cy.getWithinIframe('[name="exp-date"]').type('1227');
    cy.getWithinIframe('[name="cvc"]').type('987');

    // Trigger purchase
    cy.get('.checkout-main-column-wrapper .payment-details-wrapper button.primary')
      .should('not.be.disabled')
      .click();

    cy.get('.checkout-main-column-wrapper .steps-wrapper .step')
      .eq(1)
      .should('be.visible')
      .and('contain', '2. Order placed')
      .and('have.class', 'active');

    cy.get('.checkout-main-column-wrapper .address-details-wrapper')
      .should('not.exist');
    cy.get('.checkout-main-column-wrapper .payment-details-wrapper')
      .should('not.exist');

    cy.get('.checkout-main-column-wrapper .order-wrapper')
      .should('be.visible');
    cy.get('.checkout-main-column-wrapper .order-wrapper .order-title')
      .should('have.text', 'Thanks for purchasing!');

  })
})