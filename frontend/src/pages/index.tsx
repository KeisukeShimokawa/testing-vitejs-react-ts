import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/signup" passHref>
            <button>Signup</button>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Home;
