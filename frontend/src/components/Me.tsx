import { apiClient } from '../api/client';

export const Me = () => {
  const handleClick = async () => {
    await apiClient.get('/auth/me');

    alert('認証チェック完了');
  };

  return (
    <>
      <button onClick={handleClick}>チェック</button>
    </>
  );
};
