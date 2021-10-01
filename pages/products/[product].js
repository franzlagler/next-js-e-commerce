import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import AddToCartButton from '../../components/AddToCartButton';
import AmountInput from '../../components/AmountInput';

const singleProductContainerStyle = css`
  display: grid;
  justify-content: center;
  grid-gap: 40px;
  padding: 40px 200px;
  border: 3px solid #212529;
  border-radius: 15px;
`;

const singleProductHeading = css`
  font-size: 50px;
  text-align: center;
`;

const singleProductDescription = css`
  font-size: 20px;
  line-height: 1.4;
`;

const singleProductPrice = css`
  font-size: 30px;
  font-weight: bolder;
`;

const spanTextStyle = css`
  font-weight: normal;
  font-size: 16px;
`;

export default function product(props) {
  return (
    <>
      <Head>
        <title>{props.singleProduct.name}</title>
      </Head>
      <div css={singleProductContainerStyle}>
        <h2 css={singleProductHeading}>{props.singleProduct.name}</h2>
        <Image
          src={props.singleProduct.image}
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
        <AddToCartButton
          handleAddClick={() =>
            props.handleAddClick(
              props.singleProduct.id,
              props.amount[props.index],
            )
          }
          index={props.index}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { productData } = await import('../../util/productData');
  const input = context.query.product;

  const singleProduct = productData.find((el) => el.keyword === input);
  const index = productData.findIndex((el) => el.keyword === input);
  console.log(index);

  return {
    props: {
      singleProduct: singleProduct,
      index: index,
    },
  };
}
