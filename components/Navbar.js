import { css } from '@emotion/react';
import Link from 'next/link';

const navContainerStyle = css`
  background-color: blue;
`;

const navBarStyle = css`
  display: flex;
  padding: 20px;
  grid-gap: 30px;
`;

const navbarItemStyle = css`
  list-style-type: none;
`;

const navbarLinkStyle = css`
  color: white;
  cursor: pointer;
`;

function Navbar() {
  return (
    <nav css={navContainerStyle}>
      <ul css={navBarStyle}>
        <li css={navbarItemStyle}>
          <Link href="/products">
            <a css={navbarLinkStyle}>Products</a>
          </Link>
        </li>
        <li css={navbarItemStyle}>
          <Link href="/cart">
            <a css={navbarLinkStyle}>Cart</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
