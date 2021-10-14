import { fetchProductData, getPrice } from '../../util/orderPrice';

export default async function handler(req, res) {
  try {
    const { cart, products } = req.body;

    const chosenProducts = await fetchProductData(cart, products);
    const { subtotal, total } = await getPrice(cart, products);

    res.status(200).send({
      chosenProducts: chosenProducts,
      subtotal: subtotal,
      total: total,
    });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
