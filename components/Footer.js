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
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
`;

const socialMediaContainerStyle = css`
  width: 200px;
  display: grid;
  justify-content: start;
  grid-gap: 10px;
`;

const socialMediaHeadingStyle = css`
  margin-bottom: 4px;
`;

const paymentContainerStyle = css`
  width: 200px;
  display: grid;
  grid-gap: 10px;
  justify-content: end;
`;

const paymentImagesContainerStyle = css`
  display: flex;
  justify-content: flex-start;
`;
function Footer() {
  return (
    <div css={footerContainerStyle}>
      <div css={maxWidthContainer}>
        <div css={socialMediaContainerStyle}>
          <h3 css={socialMediaHeadingStyle}>Follow us</h3>
          <Image src="/images/instagram.svg" width="30px" height="30px" />
          <Image src="/images/twitter.svg" width="30px" height="30px" />
        </div>
        <div css={paymentContainerStyle}>
          <div css={paymentImagesContainerStyle}>
            <Image src="/images/apple_pay.svg" width="60px" height="60px" />
            <Image src="/images/google_pay.svg" width="100px" height="60px" />
          </div>
          <h3>Free shipping is valid on orders of 30€ or more.</h3>
        </div>
      </div>
    </div>
  );
}

export default Footer;
