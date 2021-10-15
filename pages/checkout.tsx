import { css } from '@emotion/react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeElements } from '@stripe/stripe-js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BigButton from '../components/BigButton';
import InputField from '../components/InputField';
import { getAllProducts } from '../util/database';

const checkoutContainer = css`
  padding: 40px 80px;
  border: 3px solid #212529;
  border-radius: 15px;
`;

const mainHeading = css`
  text-align: center;
  font-size: 50px;
`;

const cardLabel = css`
  display: block;
  margin: 0 0 5px 5px;
  font-size: 20px;
  font-weight: 500;
`;

const cardElementBorderContainer = css`
  display: grid;
  align-items: center;
  height: 50px;
  padding: 5px 10px;
  margin-bottom: 30px;
  border: 3px solid #212529;
  border-radius: 10px;
`;

const cardOptions = {
  hidePostalCode: true,

  style: {
    base: {
      fontSize: '20px',
    },
  },
};

const formContainer = css`
  padding: 0 50px;
`;

type CheckoutProps = {
  cart: { id: number; amount: number }[];
  products: {}[];
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  deleteAllItems: () => void;
};

export default function Checkout(props: CheckoutProps) {
  const [clientSecret, setClientSecret] = useState('');
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    street: '',
    zip: '',
    city: '',
    country: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  useEffect(() => {
    window
      .fetch('/api/set_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: props.cart, products: props.products }),
      })
      .then((res) => res.json())
      .then(({ total }) => {
        props.setTotalPrice(total);
      });
  }, [props]);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const amount = Number((props.totalPrice * 100).toFixed(2));
      const paymentIntents = await fetch('/api/payment_intents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });

      const fetchedClientSecret = await paymentIntents.json();

      setClientSecret(fetchedClientSecret.clientSecret);
    };
    if (props.totalPrice !== 0) {
      fetchClientSecret();
    }
  }, [props.totalPrice]);

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    setShippingDetails({ ...shippingDetails, [id]: value });
  };

  const saveOrderDetails = async () => {
    const orderResponse = await fetch('/api/add_order_details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shippingDetails, totalPrice: props.totalPrice }),
    });
    const orderIdObjectJSON = await orderResponse.text();
    const orderIdObject = JSON.parse(orderIdObjectJSON);
    const orderId: {} = orderIdObject.orderId.orderId;

    const orderedProductsResponse = await fetch('/api/add_ordered_products', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, cart: props.cart }),
    });
    console.log(orderedProductsResponse);
  };

  // Submitting Order/Payment
  const handleCheckoutClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    const cardElement = elements!.getElement(CardElement)!;

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
    if (payload.paymentIntent!.status === 'succeeded') {
      saveOrderDetails();
      setIsProcessing(false);
      setIsFinished(true);
      setTimeout(() => router.push('/success'), 1000);
      setTimeout(() => setIsFinished(false), 2000);
      props.deleteAllItems();
    }
    if (payload.error) {
      console.log(payload.error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div css={checkoutContainer}>
        <h1 css={mainHeading}>Checkout</h1>
        <form onSubmit={handleCheckoutClick} css={formContainer}>
          <InputField
            handleInputChange={handleInputChanges}
            id="name"
            fieldName="Name"
            placeholder="Jane Doe"
            value={shippingDetails['name']}
          />
          <InputField
            handleInputChange={handleInputChanges}
            id="street"
            fieldName="Street"
            placeholder="Abby Spark Tree"
            value={shippingDetails['street']}
          />
          <InputField
            handleInputChange={handleInputChanges}
            id="zip"
            fieldName="ZIP Code"
            placeholder="12345"
            value={shippingDetails['zip']}
          />
          <InputField
            handleInputChange={handleInputChanges}
            id="city"
            fieldName="City"
            placeholder="Washington D.C."
            value={shippingDetails['city']}
          />

          <InputField
            handleInputChange={handleInputChanges}
            id="country"
            fieldName="Country"
            placeholder="United States"
            value={shippingDetails['country']}
          />
          <label htmlFor="card" css={cardLabel}>
            Card Details
          </label>
          <div css={cardElementBorderContainer}>
            <CardElement id="card" options={cardOptions} />
          </div>
          {!isProcessing && !isFinished && (
            <BigButton data-cy="pay-button">{`Pay ${Number(
              props.totalPrice,
            ).toFixed(2)}€ now`}</BigButton>
          )}
          {isProcessing && (
            <BigButton backgroundColor="#ffba08">Processing...</BigButton>
          )}
          {isFinished && (
            <BigButton backgroundColor="#74c69d">Payment Complete!</BigButton>
          )}
        </form>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const products = await getAllProducts();

  return {
    props: {
      products,
    },
  };
}
