const addProduct = () => {
  const randomProduct = Math.floor(Math.random() * 15);
  cy.get(`[data-cy="amount-increase-${randomProduct}"]`)
    .click()
    .click()
    .click();
  cy.get(`[data-cy="add-button-${randomProduct}"]`).click();
};

const deleteProduct = (index) => {
  cy.get(`[data-cy='delete-button-${index}']`).click();
};

describe('Cart', () => {
  it('should be able to add items to cart and delete them', () => {
    cy.visit('localhost:3000/products');
    addProduct();
    addProduct();

    cy.get("[data-cy='cart-menu-item']").click();
    deleteProduct(1);
    deleteProduct(0);
  });
});
