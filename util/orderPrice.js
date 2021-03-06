// Find correct product data for cart items
export function fetchProductData(cart = [], products) {
  const selectedProducts = [];
  const allProducts = products;

  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < allProducts.length; j++) {
      if (cart[i].id === allProducts[j].productId) {
        selectedProducts.push(allProducts[j]);
        selectedProducts[i].amount = cart[i].amount;
      }
    }
  }

  return selectedProducts;
}

export function getPrice(cart, products) {
  const selectedProducts = fetchProductData(cart, products);
  console.log(selectedProducts);
  const individualTotals = selectedProducts.map((el) => el.price * el.amount);
  let subtotal = individualTotals.reduce((acc, nextVal) => (acc += nextVal), 0);
  let total;

  if (subtotal < 30 && subtotal !== 0) {
    total = subtotal + 4.95;
  } else {
    total = subtotal;
  }

  total = Number(total.toFixed(2));
  subtotal = Number(total.toFixed(2));
  return {
    subtotal: subtotal,
    total: total,
  };
}
