import { css } from '@emotion/react';

const buttonStyle = css`
  width: 100%;
  max-height: 50px;
  padding: 10px 20px;
  background-color: #fc5d3d;
  border: 2px solid #212529;
  border-radius: 5px;
  font-size: 22px;
  cursor: pointer;
  &:disabled {
    background-color: #ced4da;
    opacity: 0.5;
    color: #495057;
    cursor: auto;
  }
`;

function BigButton(props) {
  return (
    <button
      onClick={props.handleAddClick}
      css={buttonStyle}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
}

export default BigButton;
