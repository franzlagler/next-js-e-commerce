import Stripe from 'stripe';

const stripe = new Stripe(String(process.env.SECRET_KEY));

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur',
      });
      res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      res.status(500).json({ statusCode: 500, messagr: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
