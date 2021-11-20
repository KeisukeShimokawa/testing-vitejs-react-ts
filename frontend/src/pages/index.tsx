import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/signup" passHref>
            <button>Sign Up</button>
          </Link>
        </li>
        <li>
          <Link href="/signin" passHref>
            <button>Sign In</button>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Home;
