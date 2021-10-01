import { css, Global } from '@emotion/react';
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
  }
`;

function MyApp({ Component, pageProps }) {
  const [cookies, setCookies] = useState([]);
  const [amount, setAmount] = useState(() => {
    const valueArray = [];
    for (let i = 0; i < 15; i++) {
      valueArray.push(1);
    }
    return valueArray;
  });

  const checkIdExistence = (id) => {
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].id === id) {
        return true;
      }
    }

    return false;
  };
  // Add item to cookie 'order'
  const handleAddClick = (id, amount) => {
    // Check if item with that id already exists
    const idExists = checkIdExistence(id);

    let updatedArray = JSON.parse(Cookies.get('order'));

    if (idExists) {
      updatedArray = updatedArray.map((el) => {
        if (el.id === id) {
          return {
            id: el.id,
            amount: el.amount + amount,
          };
        }

        return el;
      });
    } else {
      const addedProduct = {
        id: id,
        amount: amount,
      };
      updatedArray.push(addedProduct);
    }

    Cookies.set('order', JSON.stringify(updatedArray));
    setCookies(() => {
      return JSON.parse(Cookies.get('order'));
    });
  };
  // Delete item from cookie 'order'
  const handleDeleteProduct = (id) => {
    console.log(id);

    const filteredArray = cookies.filter((el) => el.id !== id);
    Cookies.set('order', JSON.stringify(filteredArray));

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

    console.log(productIndex);

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

  // Fetch cookie when component did mount
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
        <Component
          {...pageProps}
          cookies={cookies}
          amount={amount}
          handleAddClick={handleAddClick}
          handleDeleteProduct={handleDeleteProduct}
          handleIncrementClick={handleIncrementClick}
          handleDecrementClick={handleDecrementClick}
        />
      </Layout>
    </>
  );
}

export default MyApp;
