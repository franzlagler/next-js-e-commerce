import { css } from '@emotion/react';

const buttonStyle = css`
  max-height: 50px;
  padding: 12px 20px;
  background-color: #fc5d3d;
  border: 2px solid #212529;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  &:active {
    transform: scale(0.98);
  }
`;

function BigButton(props) {
  return (
    <button onClick={props.handleAddClick} css={buttonStyle}>
      {props.name}
    </button>
  );
}

export default BigButton;
