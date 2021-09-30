import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { useState } from 'react';
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
  const [selectedProductNumber, setSelectedProductNumber] = useState(() => {
    return 0;
  });

  const handleSelectedProductNumberChange = (value) => {
    setSelectedProductNumber(value);
  };
  return (
    <>
      <Global styles={globalStyle} />
      <Layout selectedProductNumber={selectedProductNumber}>
        <Component
          {...pageProps}
          handleSelectedProductNumberChange={handleSelectedProductNumberChange}
        />
      </Layout>
    </>
  );
}

export default MyApp;
