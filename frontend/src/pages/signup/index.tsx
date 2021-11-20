import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { apiClient } from '../../api/client';

const Signup: NextPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await apiClient.post('/auth/signup', {
      name,
      email,
      password,
    });

    alert('ユーザー登録完了');
    router.push('/');
  };

  return (
    <>
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
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

export default Signup;
