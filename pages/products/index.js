import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useState } from 'react';
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
function Products(props) {
  const [amount, setAmount] = useState(() => {
    const valueArray = [];
    for (let i = 0; i < props.productData.length; i++) {
      valueArray.push(1);
    }
    return valueArray;
  });

  const handleIncrementClick = (productIndex) => {
    const currentAmount = amount[productIndex];
    let updatedAmount = currentAmount;

    if (currentAmount >= 2 && currentAmount <= 8) {
      updatedAmount += 1;
    } else if (currentAmount === 1) {
      updatedAmount += 1;
    }

    console.log(updatedAmount);

    setAmount(() => {
      return [...amount, (amount[productIndex] = updatedAmount)];
    });
  };

  const handleDecrementClick = (productIndex) => {
    const currentAmount = amount[productIndex];
    let updatedAmount = currentAmount;

    if (currentAmount >= 2 && currentAmount <= 8) {
      updatedAmount -= 1;
    } else if (currentAmount === 9) {
      updatedAmount -= 1;
    }
    console.log(updatedAmount);

    setAmount((prev) => [...prev, (prev[productIndex] = updatedAmount)]);
  };

  return (
    <div css={productsContainerStyle}>
      {props.productData.map((product, index) => {
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
                  handleIncrementClick={() => handleIncrementClick(index)}
                  handleDecrementClick={() => handleDecrementClick(index)}
                />
                <AddToCartButton
                  handleAddClick={() =>
                    props.handleAddClick(product.id, amount[index])
                  }
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
