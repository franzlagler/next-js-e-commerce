import { css } from '@emotion/react';
import React from 'react';

const inputContainer = css`
  margin-bottom: 20px;
`;

const labelStyle = css`
  display: block;
  margin: 0 0 5px 5px;
  font-size: 20px;
  font-weight: 500;
`;

const inputStyle = css`
  width: 100%;
  height: 50px;
  padding: 5px 10px;
  border: 3px solid #212529;
  border-radius: 10px;
  font-size: 20px;
  &:focus {
    outline: 0;
  }
  &::placeholder {
  }
`;

export default function InputField(props: {
  id: string;
  fieldName: string;
  placeholder: string;
  value: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div css={inputContainer}>
      <label htmlFor={props.id} css={labelStyle}>
        {props.fieldName}
      </label>
      <input
        id={props.id}
        placeholder={props.placeholder}
        css={inputStyle}
        onChange={props.handleInputChange}
        value={props.value}
      />
    </div>
  );
}
