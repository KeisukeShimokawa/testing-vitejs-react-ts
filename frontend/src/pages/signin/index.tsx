import { NextPage } from 'next';
import { useState } from 'react';
import { apiClient } from '../../api/client';

const Signin: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    apiClient.post('/auth/signup', {
      name,
      email,
    });
  };

  return (
    <>
      <div>
        <h2>Sign in</h2>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Signin;
