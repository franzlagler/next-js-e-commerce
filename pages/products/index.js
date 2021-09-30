import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AddToCartButton from '../../components/AddToCartButton';
import AmountInput from '../../components/AmountInput';

const productsContainerStyle = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 40px;
`;

const singleProductContainerStyle = css`
  display: grid;
  align-items: center;
  row-gap: 30px;
  width: 360px;
  height: 100%;
  padding: 20px 40px;
  background-color: #fff;
  border: 3px solid #212529;
  border-radius: 10px;
  color: #212529;
  transform: scale(1);
  transition: transform 1s;
  &:hover {
    transform: scale(1.03);
    transition: transform 1s;
  }
`;

const productHyperlinkStyle = css`
  text-decoration: none;
  cursor: pointer;
`;

const productHeadingStyle = css`
  min-height: 60px;
`;

const productPriceStyle = css`
  font-size: 22px;
  font-weight: bolder;
`;
function Products({ productData }) {
  const [amount, setAmount] = useState(() => {
    const valueArray = [];
    for (let i = 0; i < productData.length; i++) {
      valueArray.push(1);
    }
    return valueArray;
  });

  const [order, setOrder] = useState(() => {
    if (Cookies.get('order') === undefined) {
      Cookies.set('order', JSON.stringify([]));
    }
    return Cookies.get('order') || [];
  });

  const handleIncrementDecrementClick = (e, index) => {
    const buttonName = e.currentTarget.name;
    console.log(index, buttonName);

    if (amount[index] >= 2 && amount[index] <= 8) {
      if (buttonName === 'increment') {
        setAmount(
          amount.map((el, i) => {
            if (i === index) {
              return el + 1;
            }
            return el;
          }),
        );
        return;
      }
      setAmount(
        amount.map((el, i) => {
          if (i === index) {
            return el - 1;
          }
          return el;
        }),
      );
      return;
    } else if (amount[index] === 1) {
      if (buttonName === 'increment') {
        setAmount(
          amount.map((el, i) => {
            if (i === index) {
              return el + 1;
            }
            return el;
          }),
        );
        console.log('hello');
        return;
      }

      return;
    } else if (amount[index] === 9) {
      if (buttonName === 'increment') {
        return;
      }
      setAmount(
        amount.map((el, i) => {
          if (i === index) {
            return el - 1;
          }
          return el;
        }),
      );
      return;
    }
  };

  const handleAddCartClick = (e, index) => {
    console.log(e, index);
    setOrder(() => {
      const addedProduct = {
        id: productData[index].id,
        name: productData[index].name,
        price: productData[index].price,
        amount: amount[index],
        totalPrice: (productData[index].price * amount[index]).toFixed(2),
      };
      const currentOrderArray = JSON.parse(Cookies.get('order'));
      currentOrderArray.push(addedProduct);
      Cookies.set('order', JSON.stringify(currentOrderArray));
    });
  };

  return (
    <div css={productsContainerStyle}>
      {productData.map((product, index) => {
        return (
          <div key={`product-${product.id}`}>
            <a css={productHyperlinkStyle}>
              <div css={singleProductContainerStyle}>
                <h2 css={productHeadingStyle}>{product.name}</h2>
                <Image
                  src={product.image}
                  alt="product"
                  width="80"
                  height="80"
                />
                <p css={productPriceStyle}>{product.price.toFixed(2)}€</p>
                <AmountInput
                  value={amount[index]}
                  handleIncrementDecrementClick={(e) =>
                    handleIncrementDecrementClick(e, index)
                  }
                />
                <AddToCartButton
                  handleAddCartClick={handleAddCartClick}
                  index={index}
                />
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default Products;

export async function getServerSideProps() {
  const { productData } = await import('../../util/productData');
  return {
    props: { productData: productData }, // will be passed to the page component as props
  };
}
