import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import MassiveButton from '../components/MassiveButton';
import uncleSam from '../public/images/uncle-sam.svg';
import { getReviews } from '../util/productData';
import { getPrice } from '../util/totalPrice';

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

const introductoryTextStyle = css`
  margin: 50px auto 0 auto;
  font-size: 24px;
  line-height: 1.5;
`;

const subheadingStyle = css`
  margin-top: 50px;
  margin-bottom: -30px;
  font-size: 50px;
`;

const reviewsContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 30px;
  margin-top: 40px;
`;

const singleReviewContainer = css`
  display: grid;
  grid-gap: 25px;
  width: 350px;
  padding: 20px 40px;
  border: 3px solid #212529;
  border-radius: 15px;
  font-size: 22px;
  line-height: 1.4;
`;

const singleReviewHeading = css`
  font-size: 34px;
`;

export default function Home(props) {
  return (
    <>
      <div css={heroContainerStyle}>
        <Image src={uncleSam} alt="Uncle Sam" width="350" height="350" />
        <Head>
          <title>American Candy</title>
        </Head>
        <div>
          <h1 css={heroHeadingStyle}>
            I want <span css={heroHeadingEmphasisStyle}>you</span> to buy candy,
            lots of candy.
          </h1>
          <Link href="/products">
            <a>
              <MassiveButton name="Go To Shop" />
            </a>
          </Link>
        </div>
      </div>
      <p css={introductoryTextStyle}>
        Listen to good ol' Uncle Sam and order some of America's most delicious
        candy and snacks! We offer a great variety of products from energy
        drinks with life-threatening amounts of caffeine to pepper chips that
        will bring even the toughest person to their knees.
      </p>
      <h2 css={subheadingStyle}>Reviews</h2>
      <p css={introductoryTextStyle}>
        Still not totally convinced? Then, take a look at the reviews of
        previous customers and learn what they think about our products.{' '}
      </p>
      <div css={reviewsContainerStyle}>
        {props.reviews.map((el) => {
          return (
            <div css={singleReviewContainer} key={`reviews-${el.id}`}>
              <h3 css={singleReviewHeading}>{el.author}</h3>
              <Image
                src={`/images/review${el.id}.svg`}
                width="120"
                height="120"
                alt="review author"
              />
              <p>«{el.description}»</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const reviews = await getReviews();
  const cookies = await getPrice();
  console.log(cookies);

  return {
    props: { reviews: reviews }, // will be passed to the page component as props
  };
}
