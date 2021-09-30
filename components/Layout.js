import { css } from '@emotion/react';
import Head from 'next/head';
import Navbar from './Navbar';

const mainContainerStyle = css`
  position: relative;
  top: 50px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 3% 0;
`;

function Layout({ children, ...props }) {
  return (
    <>
      <Navbar selectedProductNumber={props.selectedProductNumber} />
      <main css={mainContainerStyle}>{children}</main>
    </>
  );
}

export default Layout;
