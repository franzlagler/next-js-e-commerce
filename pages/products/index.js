import { css } from '@emotion/react';

const productsContainerStyle = css`
  display: flex;
  grid-gap: 20px;
`;

const singleProductContainerStyle = css`
  padding: 20px;
  border: 1px solid black;
`;

function products({ productData }) {
  return (
    <div css={productsContainerStyle}>
      {productData.map((product) => {
        return (
          <div css={singleProductContainerStyle} key={`product-${product.id}`}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
          </div>
        );
      })}
    </div>
  );
}

export default products;

export async function getServerSideProps(context) {
  const { productData } = await import('../../util/productData');
  return {
    props: { productData: productData }, // will be passed to the page component as props
  };
}
