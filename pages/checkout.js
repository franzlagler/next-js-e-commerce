import { css } from '@emotion/react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BigButton from '../components/BigButton';
import InputField from '../components/InputField';
import { getProducts } from '../util/database';

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

export default function Checkout(props) {
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  useEffect(() => {
    window
      .fetch('/api/order_price', {
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
    if (props.totalPrice !== 0) {
      window
        .fetch('/api/payment_intents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: props.totalPrice * 100 }),
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.clientSecret);
          console.log(data);
        });
    }
  }, [props.totalPrice]);

  const handleCheckoutClick = async (e) => {
    setIsProcessing(true);
    e.preventDefault();

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.paymentIntent.status === 'succeeded') {
      setIsProcessing(false);
      setIsFinished(true);
      setClientSecret('');
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
          <InputField id="name" fieldName="Name" placeholder="Jane Doe" />
          <InputField
            id="street"
            fieldName="Street"
            placeholder="Abby Spark Tree"
          />
          <InputField id="zip" fieldName="ZIP Code" placeholder="12345" />
          <InputField
            id="city"
            fieldName="City"
            placeholder="Washington D.C."
          />

          <InputField
            id="country"
            fieldName="Country"
            placeholder="United States"
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
  const products = await getProducts();

  return {
    props: {
      products: products,
    },
  };
}
