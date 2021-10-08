import { getProducts } from '../../util/productData';

export default async function handler(req, res) {
  try {
    const products = await getProducts();
    const { cookies } = req.body;

    const orderedProducts = [];

    for (let i = 0; i < cookies.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (cookies[i].id === products[j].id) {
          orderedProducts.push(products[j]);
          orderedProducts[i].amount = cookies[i].amount;
        }
      }
    }

    const allPrices = orderedProducts.map((el) => el.price * el.amount);
    const subtotal = allPrices.reduce((acc, nextVal) => (acc += nextVal), 0);

    let total;

    if (subtotal < 30 && subtotal !== 0) {
      total = subtotal + 4.95;
    } else {
      total = subtotal;
    }

    res.status(200).send({
      orderedProducts: orderedProducts,
      subtotal: subtotal,
      total: total,
    });
  } catch (err) {
    console.log(err);
  }
}
