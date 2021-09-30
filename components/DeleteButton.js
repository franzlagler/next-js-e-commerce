import { css } from '@emotion/react';
import { prependOnceListener } from 'process';

const deleteButtonStyle = css`
  width: 20px;
  display: inline-block;
  background-color: inherit;
  border: 0;
  color: #fc5d3d;
  cursor: pointer;
`;

function DeleteButton(props) {
  return (
    <button css={deleteButtonStyle} onClick={props.handleDeleteProductClick}>
      Delete
    </button>
  );
}

export default DeleteButton;
