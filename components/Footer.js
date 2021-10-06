import { css } from '@emotion/react';
import Image from 'next/image';

const footerContainerStyle = css`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  background-color: #72c2e9;
  border-top: 2px solid black;
`;

const maxWidthContainer = css`
  display: grid;
  justify-content: center;
  align-content: center;
  grid-gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  height: 100%;
`;

const socialMediaImageContainerStyle = css`
  display: flex;
  justify-content: center;
  grid-gap: 10px;
`;

function Footer() {
  return (
    <div css={footerContainerStyle}>
      <div css={maxWidthContainer}>
        <h3>For orders over 30€, we offer free shipping.</h3>
        <div css={socialMediaImageContainerStyle}>
          <Image src="/images/instagram.svg" width="30px" height="30px" />
          <Image src="/images/twitter.svg" width="30px" height="30px" />
          <Image src="/images/tik-tok.svg" width="30px" height="30px" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
