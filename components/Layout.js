import { css } from '@emotion/react';
import Navbar from './Navbar';

const mainContainerStyle = css`
  max-width: 800px;
  margin: 0 auto;
  padding: 3% 0;
`;

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main css={mainContainerStyle}>{children}</main>
    </>
  );
}

export default Layout;
