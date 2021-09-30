import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import DeleteButton from '../components/DeleteButton';

const orderContainerStyle = css`
  display: grid;
  row-gap: 20px;
  justify-content: center;
  padding: 40px 0;
  background-color: #fff;
  border: 3px solid #212529;
  border-radius: 15px;
`;

const orderMainHeadingStyle = css`
  font-size: 50px;
`;

const orderSingleProductContainerStyle = css`
  display: grid;
  justify-content: flex-start;
  row-gap: 15px;
  margin: 10px 0;
  padding: 20px 25px;
  border: 2px solid #212529;
  border-radius: 10px;
`;

const totalPriceStyle = css`
  font-size: 30px;
  font-weight: bolder;
`;

function Cart(props) {
  const [cookies, setCookies] = useState([]);
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleDeleteProductClick = (id) => {
    let currentOrder = [...order];
    currentOrder = currentOrder.filter((el) => {
      return el['id'] !== id;
    });

    setOrder(currentOrder);
  };

  // Fetch Cookie at first run
  useEffect(() => {
    setCookies(() => {
      return JSON.parse(Cookies.get('order'));
    });
  }, []);

  useEffect(() => {
    const chosenProducts = [];

    for (let i = 0; i < cookies.length; i++) {
      for (let j = 0; j < props.productData.length; j++) {
        if (cookies[i].id === props.productData[j].id) {
          chosenProducts.push(props.productData[j]);
          chosenProducts[i].amount = cookies[i].amount;
        }
      }
    }
    setOrder(chosenProducts);
  }, [cookies, props.productData]);

  useEffect(() => {
    setTotalPrice(() => {
      const allPrices = order.map((el) => el.price * el.amount);
      const total = allPrices.reduce((acc, nextVal) => (acc += nextVal), 0);
      setTotalPrice(total.toFixed(2));
      Cookies.set('order', JSON.stringify(order));
    });
  }, [order]);

  return (
    <div css={orderContainerStyle}>
      <h1 css={orderMainHeadingStyle}>Review Your Order</h1>
      {totalPrice === '0.00' && <p>Your shopping cart is currently empty.</p>}
      {order.map((el) => {
        return (
          <div key={`product-${el.id}`} css={orderSingleProductContainerStyle}>
            <h2>{el.name}</h2>
            <Image src={el.image} alt="product" width="80" height="80" />
            <p>Amount: {el.amount}</p>
            <p>Product Price: {el.price.toFixed(2)}€</p>
            <DeleteButton
              handleDeleteProductClick={() => handleDeleteProductClick(el.id)}
            />
          </div>
        );
      })}
      <p css={totalPriceStyle}>Total: {totalPrice}€</p>
    </div>
  );
}

export default Cart;

export async function getServerSideProps() {
  const { productData } = await import('../util/productData');
  return {
    props: { productData: productData }, // will be passed to the page component as props
  };
}
