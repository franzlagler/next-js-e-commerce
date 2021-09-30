import { css } from '@emotion/react';

const buttonStyle = css`
  max-height: 50px;
  padding: 15px 20px;
  background-color: #fc5d3d;
  border: 2px solid #212529;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
`;

function AddToCartButton(props) {
  return (
    <button
      onClick={(e) => props.handleAddCartClick(e, props.index)}
      css={buttonStyle}
    >
      Add To Cart
    </button>
  );
}

export default AddToCartButton;
