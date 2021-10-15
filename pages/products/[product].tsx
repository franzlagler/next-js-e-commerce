import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AmountInput from '../../components/AmountInput';
import BigButton from '../../components/BigButton';
import { getAllProducts, getSingleProduct } from '../../util/database';

const singleProductContainerStyle = css`
  display: grid;
  justify-content: center;
  grid-gap: 44px;
  padding: 40px 150px;
  margin-top: 50px;
  border: 3px solid #212529;
  border-radius: 15px;
  font-size: 22px;
`;

const singleProductHeading = css`
  font-size: 50px;
  text-align: center;
`;

const singleProductDescription = css`
  font-size: 22px;
  line-height: 1.4;
`;

const singleProductPrice = css`
  font-size: 35px;
  font-weight: bolder;
`;

const spanTextStyle = css`
  font-weight: normal;
  font-size: 20px;
`;

type ProductProps = {
  singleProduct: {
    productId: number;
    name: string;
    price: number;
  };
  index: number;
  amount: [];
  handleIncrementClick: (index: number) => void;
  handleDecrementClick: (index: number) => void;
  handleAddClick: (id: number, amount: number) => void;
};

export default function product(props: ProductProps) {
  return (
    <>
      <Head>
        <title>{props.singleProduct.name}</title>
      </Head>
      <Link href="/products">
        <a>
          <BigButton width="300px">
            <span aria-label="arrow">←</span> View all products
          </BigButton>
        </a>
      </Link>
      <div css={singleProductContainerStyle}>
        <h2 css={singleProductHeading}>{props.singleProduct.name}</h2>
        <Image
          src={`/images/img${props.singleProduct.productId}.svg`}
          alt="product"
          width="150"
          height="150"
        />
        <p css={singleProductDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          egestas tempor nibh, a dapibus lectus. Praesent id lobortis risus. Ut
          rutrum dui euismod, pretium ante quis, lacinia sapien. Etiam tempus
          augue id laoreet molestie. Suspendisse posuere non diam at accumsan.
          Nunc sodales lorem a leo efficitur, nec mattis velit tempor. Nulla dui
          tortor, rutrum quis gravida et, laoreet id sapien. Pellentesque quam
          sapien, feugiat dapibus consequat vitae, suscipit non orci.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas.
        </p>
        <p css={singleProductPrice}>
          {props.singleProduct.price.toFixed(2)}€
          <span css={spanTextStyle}> per unit</span>
        </p>
        <AmountInput
          value={props.amount[props.index]}
          handleIncrementClick={() => props.handleIncrementClick(props.index)}
          handleDecrementClick={() => props.handleDecrementClick(props.index)}
        />
        <BigButton
          onClick={() =>
            props.handleAddClick(
              props.singleProduct.productId,
              props.amount[props.index],
            )
          }
        >
          Add To Cart
        </BigButton>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const allProducts = await getAllProducts();

  let singleProduct = await getSingleProduct(context.query.product);
  singleProduct = singleProduct[0];

  const index = allProducts.findIndex(
    (el: { keyword: string }) => el.keyword === context.query.product,
  );

  return {
    props: {
      singleProduct: singleProduct,
      index: index,
    },
  };
}
