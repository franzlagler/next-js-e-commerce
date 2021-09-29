import { css } from '@emotion/react';

const amountContainerStyle = css``;

const amountLabelStyle = css`
  margin-right: 10px;
`;

const amountInputFieldStyle = css`
  width: 50px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
`;

function AmountInput() {
  return (
    <div>
      <label htmlFor="amount" css={amountLabelStyle}>
        Amount:
      </label>
      <input
        type="number"
        min="1"
        max="9"
        id="amount"
        css={amountInputFieldStyle}
      />
    </div>
  );
}

export default AmountInput;
