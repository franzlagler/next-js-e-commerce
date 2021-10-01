import { css } from '@emotion/react';

const buttonStyle = css`
  max-height: 50px;
  padding: 15px 20px;
  background-color: #72c2e9;
  border: 2px solid #212529;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
`;

function CheckoutButton(props) {
  return (
    <button onClick={props.handleAddClick} css={buttonStyle}>
      Checkout
    </button>
  );
}

export default CheckoutButton;
