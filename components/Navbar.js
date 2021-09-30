import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import cart from '../public/images/cart.svg';
import logo from '../public/images/logo.svg';

const navContainerStyle = css`
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: #72c2e9;
  border-bottom: 2px solid black;
`;

const navBarStyle = css`
  display: flex;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  grid-gap: 30px;
`;

const navbarItemStyle = css`
  list-style-type: none;
  &:last-of-type {
    margin-left: auto;
  }
`;

const navbarLinkStyle = css`
  font-weight: 500;
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
            <a>
              <Image src={logo} width="120px" height="60px" />
            </a>
          </Link>
        </li>
        <li css={navbarItemStyle}>
          <Link href="/products">
            <a css={navbarLinkStyle}>Products</a>
          </Link>
        </li>
        <li css={navbarItemStyle}>
          <Link href="/cart">
            <a css={navbarLinkStyle}>
              <Image src={cart} width="40" height="40px" />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
