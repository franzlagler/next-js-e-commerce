import { css, Global } from '@emotion/react';
import Layout from '../components/Layout';

const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global styles={globalStyle} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
