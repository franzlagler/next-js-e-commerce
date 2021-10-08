import { css } from '@emotion/react';
import { CardElement } from '@stripe/react-stripe-js';
import BigButton from './BigButton';
import InputField from './InputField';

const cardLabel = css`
  display: block;
  margin: 0 0 5px 5px;
  font-size: 20px;
  font-weight: 500;
`;

const cardElementBorderContainer = css`
  display: grid;
  align-items: center;
  height: 50px;
  padding: 5px 10px;
  border: 3px solid #212529;
  border-radius: 10px;
`;

const cardOptions = {
  style: {
    base: {
      fontSize: '20px',
    },
  },
};

export default function CheckoutForm(props) {
  return (
    <form onSubmit={props.handleCheckoutClick}>
      <InputField id="name" fieldName="Name" placeholder="Jane Doe" />
      <InputField
        id="street"
        fieldName="Street"
        placeholder="Abby Spark Tree"
      />
      <InputField id="zip" fieldName="ZIP Code" placeholder="12345" />
      <InputField
        id="country"
        fieldName="Country"
        placeholder="United States"
      />
      <label htmlFor="card" css={cardLabel}>
        Card Details
      </label>
      <div css={cardElementBorderContainer}>
        <CardElement id="card" options={cardOptions} />
      </div>
      <BigButton name="Pay" />
    </form>
  );
}
