import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { apiClient } from '../../api/client';

const Signin: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await apiClient.post('/auth/signin', {
      email,
      password,
    });

    alert('ログイン完了');
    router.push('/');
  };

  return (
    <>
      <div>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Mail Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Signin;
