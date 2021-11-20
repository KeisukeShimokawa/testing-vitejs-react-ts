import axios from 'axios';
import { Router } from 'next/dist/client/router';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    console.log('Request called ..');
    return config;
  },
  (error) => {
    console.log('Request Rejected ...');
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    if (
      error.response.status === 401 &&
      originalConfig.url === '/auth/refresh'
    ) {
      window.location.pathname = '/signin';
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const _response = await apiClient.get('/auth/refresh');
        if (_response.status === 200) {
          return apiClient(originalConfig);
        }
      } catch (_err) {
        alert('here');
        return Promise.reject(_err);
      }
    }

    return Promise.reject(error);
  },
);

export { apiClient };
