import { css } from '@emotion/react';
import Footer from './Footer';
import Navbar from './Navbar';

const pageContainerStyle = css`
  min-height: 100vh;
  overflow: hidden;
  position: relative;
`;

const mainContainerStyle = css`
  position: relative;
  top: 100px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0 500px 0;
`;

function Layout({ children, ...props }) {
  return (
    <div css={pageContainerStyle}>
      <Navbar cart={props.cart} dataCy={props.dataCy} />
      <main css={mainContainerStyle}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
