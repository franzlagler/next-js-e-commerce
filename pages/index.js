import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import uncleSam from '../public/images/uncle-sam.svg';

const heroContainerStyle = css`
  display: flex;
  align-items: center;
  padding: 25px;
  background-color: #fff;
  border: 4px solid #212529;
  border-radius: 15px;
`;

const heroHeadingStyle = css`
  font-size: 50px;
  line-height: 1.5;
`;

const heroHeadingEmphasisStyle = css`
  text-transform: uppercase;
`;

const introductoryTextStyle = css`
  margin-top: 40px;
  font-size: 24px;
  line-height: 1.5;
`;

export default function Home() {
  return (
    <>
      <div css={heroContainerStyle}>
        <Image src={uncleSam} alt="Uncle Sam" width="500" height="500" />
        <Head>
          <title>American Candy</title>
        </Head>
        <h1 css={heroHeadingStyle}>
          I want <span css={heroHeadingEmphasisStyle}>you</span> to buy candy,
          lots of candy.
        </h1>
      </div>
      <p css={introductoryTextStyle}>
        Listen to good ol' Uncle Sam and order some of America's best candy and
        snacks! We offer a great variety of products from energy drinks with
        life-threatening amounts of caffeine to pepper chips that will bring
        even the toughest person to their knees.
      </p>
    </>
  );
}
