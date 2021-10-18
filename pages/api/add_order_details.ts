import { addOrderDetails } from '../../util/database';

type HandlerProps = {
  req: {
    body: {
      shippingDetails: {
        name: string;
        street: string;
        zip: string;
        city: string;
        country: string;
      };
      totalPrice: number;
    };
    method: string;
  };
  res: {
    status: (number: number) => {
      json: (arg1: {
        orderId?: number;
        statusCode?: number;
        message?: { message: {} };
      }) => void;
      end: (string: string) => void;
    };
    setHeader: (string1: string, string2: string) => void;
  };
};

export default async function handler(
  req: HandlerProps['req'],
  res: HandlerProps['res'],
) {
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
      const orderId = await addOrderDetails(date, address, totalPrice);
      res.status(200).json({ orderId });
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}
