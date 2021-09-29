import { css } from '@emotion/react';
import Link from 'next/link';

const navContainerStyle = css`
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: #72c2e9;
  border-bottom: 2px solid black;
`;

const navBarStyle = css`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  grid-gap: 30px;
`;

const navbarItemStyle = css`
  list-style-type: none;
`;

const navbarLinkStyle = css`
  color: #212529;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

function Navbar() {
  return (
    <nav css={navContainerStyle}>
      <ul css={navBarStyle}>
        <li css={navbarItemStyle}>
          <Link href="/">
            <a css={navbarLinkStyle}>Home</a>
          </Link>
        </li>
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
