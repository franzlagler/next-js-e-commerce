import { addOrder, getOrders } from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, street, zip, city, country } = req.body.shippingDetails;
      const { totalPrice } = req.body;
      const address = `${name}
      ${street}
      ${zip}
      ${city}
      ${country}`;
      const date = new Date().toLocaleDateString();
      addOrder(date, address, totalPrice);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}
