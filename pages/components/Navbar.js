import { css } from '@emotion/react';
import Image from 'next/dist/client/image';

const navContainerStyle = css`
  background-color: blue;
`;

const navBarStyle = css`
  display: flex;
  padding: 20px;
  grid-gap: 30px;
`;

const navBarItemStyle = css`
  list-style-type: none;
`;

function Navbar() {
  return (
    <nav css={navContainerStyle}>
      <ul css={navBarStyle}>
        <li css={navBarItemStyle}>Products</li>
        <li css={navBarItemStyle}>About</li>
        <li css={navBarItemStyle}>Cart</li>
      </ul>
    </nav>
  );
}

export default Navbar;
