describe('Checkout', () => {
  it('should be able to go to checkout, fill in payment details, complete the payment process and be forwarded to a thank-you-page', () => {
    cy.visit('/products');
    const randomProduct = Math.floor(Math.random() * 15);
    cy.get(`[data-cy="amount-increase-${randomProduct}"]`).click();
    cy.get(`[data-cy="add-button-${randomProduct}"]`).click();
    cy.get("[data-cy='cart-menu-item']").click();
    cy.get("[data-cy='checkout-button']").click();
    cy.iframe('[title="Secure card payment input frame"]')
      .find('[name="cardnumber"]')
      .type('4242424242424242');
    cy.iframe('[title="Secure card payment input frame"]')
      .find('[name="exp-date"]')
      .type('0424');
    cy.iframe('[title="Secure card payment input frame"]')
      .find('[name="cvc"]')
      .type('123');

    cy.get('[data-cy="pay-button"]').click();
    cy.get('[data-cy="home-button"]').click();
  });
});
