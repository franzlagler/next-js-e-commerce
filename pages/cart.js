import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AmountInput from '../components/AmountInput';
import BigButton from '../components/BigButton';
import DeleteButton from '../components/DeleteButton';
import { getProducts } from '../util/productData';

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

export default function Cart(props) {
  const [order, setOrder] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const shippingCosts = 4.95;

  useEffect(() => {
    window
      .fetch('/api/order_price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cookies: props.cookies }),
      })
      .then((res) => res.json())
      .then(({ orderedProducts, subtotal, total }) => {
        setOrder(orderedProducts);
        setSubTotal(subtotal);
        props.setTotalPrice(total);
      });
  }, [props, props.cookies]);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div css={orderContainerStyle}>
        <h1 css={orderMainHeadingStyle}>Review Order</h1>
        {order.length === 0 && <p>Your shopping cart is currently empty.</p>}
        {order.length !== 0 &&
          order.map((el) => {
            return (
              <div
                key={`product-${el.id}`}
                css={orderSingleProductContainerStyle}
              >
                <div css={orderSingleProductSection1Style}>
                  <h2 css={productHeadingStyle}>{el.name}</h2>

                  <p>
                    <span css={productPriceStyle}>{el.price.toFixed(2)}€</span>{' '}
                    per unit
                  </p>

                  <AmountInput
                    value={el.amount}
                    handleIncrementClick={(e) =>
                      props.handleUpdateAmountCartClick(e, el.id)
                    }
                    handleDecrementClick={(e) =>
                      props.handleUpdateAmountCartClick(e, el.id)
                    }
                  />
                  <DeleteButton
                    handleDeleteProduct={() => props.handleDeleteProduct(el.id)}
                  />
                </div>
                <Image
                  src={`/images/img${el.id}.svg`}
                  alt="product"
                  width={90}
                  height={90}
                />
              </div>
            );
          })}

        <p>Subtotal: {Number(subTotal).toFixed(2)}€</p>

        {subTotal < 30 && subTotal !== 0
          ? `Shipping Costs: ${shippingCosts}€`
          : 'Shipping Costs: 0.00€'}
        <hr css={horizontalRulerStyle} />

        <p css={totalPriceStyle}>
          Total: {Number(props.totalPrice).toFixed(2)}€
        </p>
        <Link href="/checkout">
          <a>
            <BigButton disabled={props.totalPrice !== 0 ? false : true}>
              Go To Checkout
            </BigButton>
          </a>
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: { productData: products }, // will be passed to the page component as props
  };
}
