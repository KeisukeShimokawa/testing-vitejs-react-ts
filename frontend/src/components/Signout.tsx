import React from 'react';
import { apiClient } from '../api/client';

export const Signout = () => {
  const handleClick = async () => {
    await apiClient.post('/auth/signout');

    alert('ログアウト');
  };

  return (
    <>
      <button onClick={handleClick}>ログアウト</button>
    </>
  );
};
