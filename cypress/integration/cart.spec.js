const addProduct = () => {
  const randomProduct = Math.floor(Math.random() * 15);
  cy.get(`[data-cy="amount-increase-${randomProduct}"]`)
    .should('be.visible')
    .click()
    .click()
    .click();
  cy.get(`[data-cy="add-button-${randomProduct}"]`)
    .should('be.visible')
    .click();
};

const deleteProduct = (index) => {
  cy.get(`[data-cy='delete-button-${index}']`).should('be.visible').click();
};

describe('Cart', () => {
  it('should be able to add items to cart and delete them', () => {
    cy.visit('http://localhost:3000/products');
    addProduct();
    addProduct();

    cy.get("[data-cy='cart-menu-item']").should('be.visible').click();
    deleteProduct(1);
    deleteProduct(0);
  });
});
