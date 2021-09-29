import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '../../components/AddToCartButton';
import AmountInput from '../../components/AmountInput';
import image11 from '../../public/images/product11.svg';

const productsContainerStyle = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 40px;
`;

const singleProductContainerStyle = css`
  display: grid;
  row-gap: 15px;
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
    transform: scale(1.05);
    transition: transform 1s;
  }
`;

const productHyperlinkStyle = css`
  text-decoration: none;
  cursor: pointer;
`;

function products({ productData }) {
  const handleAmountChange = (e) => {
    const input = e.currentTarget.value;
    if (input > 9) {
      e.preventDefault();
    }
  };
  return (
    <div css={productsContainerStyle}>
      {productData.map((product) => {
        return (
          <div key={`product-${product.id}`}>
            {/*<Link href={`/products/${product.keyword}`}>*/}
            <a css={productHyperlinkStyle}>
              <div css={singleProductContainerStyle}>
                <h2>{product.name}</h2>
                <Image src={image11} alt="product" />
                <p>{product.price.toFixed(2)}€</p>
                <AmountInput />
                <AddToCartButton />
              </div>
            </a>
            {/*  </Link> */}
          </div>
        );
      })}
    </div>
  );
}

export default products;

export async function getServerSideProps() {
  const { productData } = await import('../../util/productData');
  return {
    props: { productData: productData }, // will be passed to the page component as props
  };
}
