import { css } from '@emotion/react';
import Footer from './Footer';
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
      <Navbar cookies={props.cookies} />
      <main css={mainContainerStyle}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
