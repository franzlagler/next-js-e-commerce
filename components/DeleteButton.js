import { css } from '@emotion/react';

const deleteButtonStyle = css`
  width: fit-content;
  display: inline-block;
  background-color: inherit;
  border: 0;
  color: #fc5d3d;
  cursor: pointer;
  font-size: 14px;
`;

function DeleteButton(props) {
  return (
    <button css={deleteButtonStyle} onClick={props.handleDeleteProduct}>
      Delete
    </button>
  );
}

export default DeleteButton;
