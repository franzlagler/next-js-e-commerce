import { css, Global } from '@emotion/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {
  addItem,
  checkItemExistence,
  updateAmountInCart,
  updateItem,
} from '../util/cartItems';
import { getCookies, setCookies, updateCookies } from '../util/cookies';
import { decrementAmount, incrementAmount } from '../util/productAmount';

const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter';
  }

  body {
    background-color: #f8f9fa;
    height: 100vh;
  }

  a {
    text-decoration: none;
  }
`;

const stripePromise = loadStripe(
  String(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY),
  {
    apiVersion: '2020-08-27',
  },
);

export default function MyApp({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState([]);

  const [amount, setAmount] = useState(() => {
    const valueArray = [];
    for (let i = 0; i < 15; i++) {
      valueArray.push(1);
    }
    return valueArray;
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const handleIncrementClick = (productIndex: number) => {
    const updatedAmount = incrementAmount(productIndex, amount);
    setAmount(
      amount.map((el, index) => {
        if (index === productIndex) {
          return updatedAmount;
        }

        return el;
      }),
    );
  };

  const handleDecrementClick = (productIndex: number) => {
    const updatedAmount = decrementAmount(productIndex, amount);

    setAmount(
      amount.map((el, index) => {
        if (index === productIndex) {
          return updatedAmount;
        }

        return el;
      }),
    );
  };

  // Add item to cookie 'order'
  const handleAddClick = (id: string, productAmount: number) => {
    // Check if item with that id already exists
    const idExists = checkItemExistence(id, cart);
    let newCart;
    if (idExists) {
      newCart = updateItem(id, cart, productAmount);
    } else {
      newCart = addItem(id, cart, productAmount);
    }

    setCart(updateCookies('cart', newCart));

    setAmount(amount.map(() => 1));
  };
  // Delete item from cookie 'cart'
  const handleDeleteProduct = (id: string) => {
    const filteredArray = cart.filter((el: { id: string }) => el.id !== id);

    setCart(updateCookies('cart', filteredArray));
  };

  // Update Product Amount on Cart Page
  const handleUpdateAmountCartClick = (
    e: React.TouchEvent<HTMLButtonElement>,
    id: string,
  ) => {
    const buttonName = e.currentTarget.name;
    const updatedArray = updateAmountInCart(buttonName, id, cart);

    setCart(updateCookies('cart', updatedArray));
  };

  // Delete Items in Cart

  const deleteAllItems = () => {
    setCart(updateCookies('cart', []));
  };

  useEffect(() => {
    if (!getCookies('cart')) {
      setCookies('cart', []);
    }

    setCart(getCookies('cart'));
  }, []);

  return (
    <>
      <Global styles={globalStyle} />
      <Layout cart={cart} dataCy="cart-menu-item">
        <Elements stripe={stripePromise}>
          <Component
            {...pageProps}
            cart={cart}
            amount={amount}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            handleAddClick={handleAddClick}
            handleDeleteProduct={handleDeleteProduct}
            handleIncrementClick={handleIncrementClick}
            handleDecrementClick={handleDecrementClick}
            handleUpdateAmountCartClick={handleUpdateAmountCartClick}
            deleteAllItems={deleteAllItems}
            setAmount={setAmount}
          />
        </Elements>
      </Layout>
    </>
  );
}
