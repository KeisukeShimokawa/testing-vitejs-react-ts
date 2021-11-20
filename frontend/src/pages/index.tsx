import type { NextPage } from 'next';
import Link from 'next/link';
import { Me } from '../components/Me';
import { Signout } from '../components/Signout';

const Home: NextPage = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/signup" passHref>
            <button>ユーザー登録</button>
          </Link>
        </li>
        <li>
          <Link href="/signin" passHref>
            <button>ログイン</button>
          </Link>
        </li>
        <li>
          <Signout />
        </li>
        <li>
          <Me />
        </li>
      </ul>
    </>
  );
};

export default Home;
