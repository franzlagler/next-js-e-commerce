import { addOrderedProducts } from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { orderId, cart } = req.body;
      await addOrderedProducts(orderId, cart);
      res
        .status(200)
        .json({ statusCode: 200, message: 'Order successfully placed' });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}
