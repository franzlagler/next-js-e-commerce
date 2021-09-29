import { css } from '@emotion/react';

const singleProductContainerStyle = css`
  display: grid;
  justify-content: center;
`;

const singleProductHeading = css`
  font-size: 40px;
  font-weight: normal;
  letter-spacing: 1.5px;
  text-align: center;
`;

export default function product({ singleProduct }) {
  return (
    <div css={singleProductContainerStyle}>
      <h2 css={singleProductHeading}>{singleProduct.name}</h2>
      <p>{singleProduct.price}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { productData } = await import('../../util/productData');
  const input = context.query.product;

  const singleProduct = productData.find((el) => el.keyword === input);
  return {
    props: {
      singleProduct: singleProduct,
    },
  };
}
