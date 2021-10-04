import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import AmountInput from '../../components/AmountInput';
import BigButton from '../../components/BigButton';
import { getProducts } from '../../util/productData';

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
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <div css={productsContainerStyle}>
        {props.productData.map((product, index) => {
          return (
            <div key={`product-${product.id}`}>
              <div css={singleProductContainerStyle}>
                <Link href={`products/${product.keyword}`}>
                  <a css={productHyperlinkStyle}>
                    <h2 css={productHeadingStyle}>{product.name}</h2>
                  </a>
                </Link>
                <Image
                  src={`/images/${product.image}.svg`}
                  alt="product"
                  width="80"
                  height="80"
                />

                <p css={productPriceStyle}>{product.price.toFixed(2)}€</p>
                <AmountInput
                  value={props.amount[index]}
                  handleIncrementClick={() => props.handleIncrementClick(index)}
                  handleDecrementClick={() => props.handleDecrementClick(index)}
                />
                <BigButton
                  name="Add to Cart"
                  handleAddClick={() =>
                    props.handleAddClick(product.id, props.amount[index])
                  }
                  index={index}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Products;

export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: { productData: products }, // will be passed to the page component as props
  };
}
