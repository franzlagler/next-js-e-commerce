import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';
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

  const handleAddClick = (id, amount) => {
    const addedProduct = {
      id: id,
      amount: amount,
    };

    const updatedArray = JSON.parse(Cookies.get('order'));
    updatedArray.push(addedProduct);
    Cookies.set('order', JSON.stringify(updatedArray));
    setCookies(() => {
      return JSON.parse(Cookies.get('order'));
    });
  };

  const handleDeleteProduct = (id) => {
    console.log(id);

    const filteredArray = cookies.filter((el) => el.id !== id);
    Cookies.set('order', JSON.stringify(filteredArray));

    setCookies(() => {
      return JSON.parse(Cookies.get('order'));
    });
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
        <Component
          {...pageProps}
          cookies={cookies}
          handleAddClick={handleAddClick}
          handleDeleteProduct={handleDeleteProduct}
        />
      </Layout>
    </>
  );
}

export default MyApp;
