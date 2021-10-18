import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import cartImg from '../public/images/cart.svg';
import logo from '../public/images/logo.png';

const navContainerStyle = css`
  position: fixed;
  z-index: 1;
  width: 100%;
  padding: 8px 0;
  background-color: #72c2e9;
  border-bottom: 2px solid black;
`;

const navBarStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  grid-gap: 40px;
`;

const navbarItemStyle = css`
  font-size: 20px;
  font-weight: 500;
  list-style-type: none;
  &:last-of-type {
    margin-left: auto;
  }
`;

const navbarLinkStyle = css`
  color: #212529;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

const logoContainer = css`
  width: 100px;
`;

const cartContainerStyle = css`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const cartImageStyle = css`
  width: 100%;
`;

const selectedProductStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-35%, -40%);
  width: 20px;
  text-align: center;
  font-size: 8px;
  font-weight: bolder;
`;

function Navbar(props: {
  cart: { id: number; amount: number }[];
  dataCy: string;
}) {
  return (
    <nav css={navContainerStyle}>
      <ul css={navBarStyle}>
        <li css={navbarItemStyle}>
          <div css={logoContainer}>
            <Link href="/">
              <a>
                <Image src={logo} />
              </a>
            </Link>
          </div>
        </li>
        <li css={navbarItemStyle}>
          <Link href="/products">
            <a css={navbarLinkStyle}>Products</a>
          </Link>
        </li>
        <li css={navbarItemStyle}>
          <Link href="/cart">
            <a css={navbarLinkStyle} data-cy={props.dataCy}>
              <div css={cartContainerStyle}>
                <Image
                  css={cartImageStyle}
                  src={cartImg}
                  width="40"
                  height="40"
                />
                <p css={selectedProductStyle}>{props.cart.length}</p>
              </div>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
