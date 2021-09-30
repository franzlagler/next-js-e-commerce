import { css } from '@emotion/react';

const amountContainerStyle = css`
  display: flex;
  align-items: center;
`;

const amountLabelStyle = css`
  margin-right: 10px;
`;

const setAmountContainerStyle = css`
  height: 35px;
`;

const amountInputFieldStyle = css`
  width: 50px;
  height: 100%;
  padding: 5px;
  border: 2px solid black;
  text-align: center;

  &:focus {
    outline: 0;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
  }
`;

const incrementDecrementButton = css`
  height: 100%;
  padding: 0 10px;
  background-color: #72c2e9;
  border: 2px solid black;
  cursor: pointer;
  &:first-of-type {
    border-radius: 5px 0 0 5px;
    border-right: 0;
  }
  &:last-of-type {
    border-radius: 0 5px 5px 0;
    border-left: 0;
  }
`;

function AmountInput(props) {
  return (
    <div css={amountContainerStyle}>
      <label htmlFor="amount" css={amountLabelStyle}>
        Amount:
      </label>
      <div css={setAmountContainerStyle}>
        <button
          id={props.id}
          name="decrement"
          css={incrementDecrementButton}
          onClick={props.handleIncrementDecrementClick}
        >
          -
        </button>
        <input
          type="number"
          min="1"
          max="9"
          id="amount"
          css={amountInputFieldStyle}
          value={props.value}
          disabled
        />
        <button
          id={props.id}
          name="increment"
          css={incrementDecrementButton}
          onClick={props.handleIncrementDecrementClick}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default AmountInput;
