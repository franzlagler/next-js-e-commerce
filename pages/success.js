import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import MassiveButton from '../components/MassiveButton';
import uncleSam from '../public/images/uncle-sam.svg';

const heroContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 40px;
  padding: 25px;
  background-color: #72c2e9;
  border: 4px solid #212529;
  border-radius: 15px;
`;

const heroHeadingStyle = css`
  width: 400px;
  margin-bottom: 20px;
  font-size: 42px;
  font-weight: 600;
  line-height: 1.5;
  color: #212529;
`;

const heroHeadingEmphasisStyle = css`
  text-transform: uppercase;
`;

export default function Success() {
  return (
    <div css={heroContainerStyle}>
      <Image src={uncleSam} alt="Uncle Sam" width="350" height="350" />

      <div>
        <h1 css={heroHeadingStyle}>Thank you for your purchase.</h1>
        <Link href="/">
          <a>
            <MassiveButton name="Go To Home" />
          </a>
        </Link>
      </div>
    </div>
  );
}
