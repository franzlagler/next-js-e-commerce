import { css } from '@emotion/react';

const footerContainerStyle = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 200px;
  background-color: #72c2e9;
  border-top: 2px solid black;
`;

function Footer() {
  return (
    <div css={footerContainerStyle}>
      <div></div>
    </div>
  );
}

export default Footer;
