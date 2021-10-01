import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import uncleSam from '../public/images/uncle-sam.svg';

export default function Home() {
  return (
    <div>
      <Head>
        <title>American Candy</title>
      </Head>
      <h1>American Products</h1>
      <Image src={uncleSam} alt="Uncle Sam" layout="fill" />
    </div>
  );
}
