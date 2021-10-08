import { css, Global } from '@emotion/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

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
`;

const stripePromise = loadStripe(
  String(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY),
);

export default function MyApp({ Component, pageProps }) {
  const [cookies, setCookies] = useState([1]);
  const [amount, setAmount] = useState(() => {
    const valueArray = [];
    for (let i = 0; i < 15; i++) {
      valueArray.push(1);
    }
    return valueArray;
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const updateCookies = (newInput) => {
    Cookies.set('order', JSON.stringify(newInput));
    setCookies(() => {
      return JSON.parse(Cookies.get('order'));
    });
  };

  const handleIncrementClick = (productIndex) => {
    const currentAmount = amount[productIndex];
    let updatedAmount = currentAmount;

    if (currentAmount >= 2 && currentAmount <= 8) {
      updatedAmount += 1;
    } else if (currentAmount === 1) {
      updatedAmount += 1;
    }

    setAmount(
      amount.map((el, index) => {
        if (index === productIndex) {
          return updatedAmount;
        }

        return el;
      }),
    );
  };

  const handleDecrementClick = (productIndex) => {
    const currentAmount = amount[productIndex];
    let updatedAmount = currentAmount;

    if (currentAmount >= 2 && currentAmount <= 8) {
      updatedAmount -= 1;
    } else if (currentAmount === 9) {
      updatedAmount -= 1;
    }

    setAmount(
      amount.map((el, index) => {
        if (index === productIndex) {
          return updatedAmount;
        }

        return el;
      }),
    );
  };

  const checkIdExistence = (id) => {
    if (cookies.find((el) => el.id === id)) return true;

    return false;
  };
  // Add item to cookie 'order'
  const handleAddClick = (id, productAmount) => {
    // Check if item with that id already exists
    const idExists = checkIdExistence(id);

    let updatedArray = JSON.parse(Cookies.get('order'));

    if (idExists) {
      updatedArray = updatedArray.map((el) => {
        if (el.id === id) {
          return {
            id: el.id,
            amount: el.amount + productAmount,
          };
        }

        return el;
      });
    } else {
      const addedProduct = {
        id: id,
        amount: productAmount,
      };
      updatedArray.push(addedProduct);
    }

    updateCookies(updatedArray);

    setAmount(amount.map(() => 1));
  };
  // Delete item from cookie 'order'
  const handleDeleteProduct = (id) => {
    console.log(id);

    const filteredArray = cookies.filter((el) => el.id !== id);
    updateCookies(filteredArray);
  };

  const handleDeleteAll = () => {
    updateCookies([]);
  };

  // Update Product Amount in Cart
  const handleUpdateAmountCartClick = (e, id) => {
    const buttonName = e.currentTarget.name;
    let updatedArray;

    if (buttonName === 'decrement') {
      updatedArray = cookies.map((el) => {
        if (el.id === id && el.amount !== 1) {
          return {
            ...el,
            amount: el.amount - 1,
          };
        }

        return el;
      });
    } else {
      updatedArray = cookies.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            amount: el.amount + 1,
          };
        }

        return el;
      });
    }

    updateCookies(updatedArray);
  };

  useEffect(() => {
    if (Cookies.get('order') === undefined) {
      Cookies.set('order', JSON.stringify([]));
    }

    setCookies(() => {
      return JSON.parse(Cookies.get('order'));
    });
  }, []);

  return (
    <>
      <Global styles={globalStyle} />
      <Layout cookies={cookies}>
        <Elements stripe={stripePromise}>
          <Component
            {...pageProps}
            cookies={cookies}
            amount={amount}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            handleAddClick={handleAddClick}
            handleDeleteProduct={handleDeleteProduct}
            handleDeleteAll={handleDeleteAll}
            handleIncrementClick={handleIncrementClick}
            handleDecrementClick={handleDecrementClick}
            handleUpdateAmountCartClick={handleUpdateAmountCartClick}
            setAmount={setAmount}
          />
        </Elements>
      </Layout>
    </>
  );
}
