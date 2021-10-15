import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AmountInput from '../components/AmountInput';
import BigButton from '../components/BigButton';
import DeleteButton from '../components/DeleteButton';
import { getAllProducts } from '../util/database';

const orderContainerStyle = css`
  display: grid;
  flex-wrap: wrap;
  row-gap: 20px;
  justify-content: center;
  margin: 0 auto;
  padding: 40px 80px;
  background-color: #fff;
  border: 3px solid #212529;
  border-radius: 15px;
  font-size: 22px;
`;

const orderMainHeadingStyle = css`
  font-size: 60px;
  margin-bottom: 20px;
  text-align: center;
`;

const orderSingleProductContainerStyle = css`
  display: flex;
  width: 500px;
  margin: 10px 0;
  padding: 25px;
  border: 3px solid #212529;
  border-radius: 10px;
  font-size: 18px;
`;

const orderSingleProductSection1Style = css`
  display: grid;
  grid-gap: 20px;
  width: 70%;
`;

const productHeadingStyle = css`
  font-size: 30px;
  margin-bottom: 10px;
`;

const productPriceStyle = css`
  font-size: 22px;
  font-weight: bolder;
`;

const totalPriceStyle = css`
  font-size: 40px;
  font-weight: bolder;
`;

const horizontalRulerStyle = css`
  width: 50%;
  margin-top: 10px;
  border: 1px solid #212529;
  border-radius: 2px;
`;

type CartProps = {
  cart: {}[];
  products: {
    productsId: number;
    name: string;
    price: number;
  }[];
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  handleUpdateAmountCartClick: (
    event: React.TouchEventHandler<HTMLButtonElement>,
    productsId: number,
  ) => void;
  handleDeleteProduct: (productId: number) => void;
};
export default function Cart(props: CartProps) {
  const [selectedProductsData, setSelectedProductsDatat] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    window
      .fetch('/api/set_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: props.cart, products: props.products }),
      })
      .then((res) => res.json())
      .then(({ chosenProducts, subtotal, total }) => {
        setSelectedProductsDatat(chosenProducts);
        setSubTotal(subtotal);
        props.setTotalPrice(total);
      });
  }, [props, props.cart]);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div css={orderContainerStyle}>
        <h1 css={orderMainHeadingStyle}>Review Order</h1>
        {selectedProductsData.length === 0 && (
          <p>Your shopping cart is currently empty.</p>
        )}
        {selectedProductsData.length !== 0 &&
          selectedProductsData.map(
            (
              el: {
                productId: number;
                name: string;
                price: number;
                amount: number;
              },
              index: number,
            ) => {
              return (
                <div
                  key={`product-${el.productId}`}
                  css={orderSingleProductContainerStyle}
                >
                  <div css={orderSingleProductSection1Style}>
                    <h2 css={productHeadingStyle}>{el.name}</h2>

                    <p>
                      <span css={productPriceStyle}>
                        {el.price.toFixed(2)}€
                      </span>{' '}
                      per unit
                    </p>

                    <AmountInput
                      value={el.amount}
                      handleIncrementClick={(
                        e: React.TouchEventHandler<HTMLButtonElement>,
                      ) => props.handleUpdateAmountCartClick(e, el.productId)}
                      handleDecrementClick={(
                        e: React.TouchEventHandler<HTMLButtonElement>,
                      ) => props.handleUpdateAmountCartClick(e, el.productId)}
                    />
                    <DeleteButton
                      onClick={() => props.handleDeleteProduct(el.productId)}
                      data-cy={`delete-button-${index}`}
                    >
                      Delete
                    </DeleteButton>
                  </div>
                  <Image
                    src={`/images/img${el.productId}.svg`}
                    alt="product"
                    width={90}
                    height={90}
                  />
                </div>
              );
            },
          )}

        <p>Subtotal: {Number(subTotal).toFixed(2)}€</p>

        <p>
          {subTotal < 30 && subTotal !== 0
            ? 'Shipping Costs: 4.95€'
            : 'Shipping Costs: 0.00€'}
        </p>
        <hr css={horizontalRulerStyle} />

        <p css={totalPriceStyle}>
          Total: {Number(props.totalPrice).toFixed(2)}€
        </p>
        <Link href="/checkout">
          <a>
            <BigButton
              disabled={props.totalPrice !== 0 ? false : true}
              data-cy="checkout-button"
            >
              Go To Checkout
            </BigButton>
          </a>
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const products = await getAllProducts();

  return {
    props: {
      products: products,
    },
  };
}
