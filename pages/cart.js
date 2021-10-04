import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AmountInput from '../components/AmountInput';
import BigButton from '../components/BigButton';
import DeleteButton from '../components/DeleteButton';
import { getProducts } from '../util/productData';

const orderContainerStyle = css`
  display: grid;
  row-gap: 20px;
  justify-content: center;
  padding: 40px 80px;
  background-color: #fff;
  border: 3px solid #212529;
  border-radius: 15px;
`;

const orderMainHeadingStyle = css`
  font-size: 50px;
`;

const orderSingleProductContainerStyle = css`
  display: grid;
  row-gap: 25px;
  margin: 10px 0;
  padding: 20px 15px;
  border: 3px solid #212529;
  border-radius: 10px;
`;

const totalPriceStyle = css`
  font-size: 30px;
  font-weight: bolder;
`;

const horizontalRulerStyle = css`
  width: 50%;
  margin-top: 10px;
  border: 1px solid #212529;
  border-radius: 2px;
`;

function Cart(props) {
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const chosenProducts = [];
    for (let i = 0; i < props.cookies.length; i++) {
      for (let j = 0; j < props.productData.length; j++) {
        if (props.cookies[i].id === props.productData[j].id) {
          chosenProducts.push(props.productData[j]);
          chosenProducts[i].amount = props.cookies[i].amount;
        }
      }
    }
    setOrder(chosenProducts);
  }, [props.cookies, props.productData]);

  useEffect(() => {
    setTotalPrice(() => {
      const allPrices = order.map((el) => el.price * el.amount);
      const total = allPrices.reduce((acc, nextVal) => (acc += nextVal), 0);
      setTotalPrice(total);
    });
  }, [order]);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div css={orderContainerStyle}>
        <h1 css={orderMainHeadingStyle}>Review Your Order</h1>
        {order.length === 0 && <p>Your shopping cart is currently empty.</p>}
        {order.map((el) => {
          return (
            <div
              key={`product-${el.id}`}
              css={orderSingleProductContainerStyle}
            >
              <h2>{el.name}</h2>
              <Image
                src={`/images/${el.image}.svg`}
                alt="product"
                width="70"
                height="70"
              />
              <p>Product Price: {el.price.toFixed(2)}€</p>

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
          );
        })}
        <hr css={horizontalRulerStyle} />
        <p css={totalPriceStyle}>Total: {Number(totalPrice).toFixed(2)}€</p>
        <BigButton name="Checkout" />
      </div>
    </>
  );
}

export default Cart;

export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: { productData: products }, // will be passed to the page component as props
  };
}
