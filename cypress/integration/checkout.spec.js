describe('Checkout', () => {
  it('should be able to go to checkout, fill in payment details, complete the payment process and be forwarded to a thank-you-page', () => {
    cy.visit('http://localhost:3000/products/');
    const randomProduct = Math.floor(Math.random() * 15);
    cy.get(`[data-cy="amount-increase-${randomProduct}"]`)
      .should('be.visible')
      .click();
    cy.get(`[data-cy="add-button-${randomProduct}"]`).click();
    cy.get("[data-cy='cart-menu-item']").should('be.visible').click();
    cy.get("[data-cy='checkout-button']").should('be.visible').click();
    cy.wait(1000);
    cy.iframe('[title="Secure card payment input frame"]')
      .find('[name="cardnumber"]')
      .should('be.visible')
      .type('4242424242424242');
    cy.iframe('[title="Secure card payment input frame"]')
      .find('[name="exp-date"]')
      .should('be.visible')
      .type('0424');
    cy.iframe('[title="Secure card payment input frame"]')
      .find('[name="cvc"]')
      .should('be.visible')
      .type('123');
    cy.get('[data-cy="pay-button"]').should('be.visible').click();
    cy.wait(3000);
    cy.get('[data-cy="home-button"]').should('be.visible').click();
  });
});
