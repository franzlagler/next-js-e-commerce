import Link from 'next/link';
import BigButton from '../components/BigButton';

export default function Success() {
  return (
    <div>
      <h3>Order succesfully place.</h3>
      <Link href="/">
        <a>
          <BigButton name="Back To Home" />
        </a>
      </Link>
    </div>
  );
}
