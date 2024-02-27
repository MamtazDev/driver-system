// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nicolos-backend.onrender.com/',
  timeout: 10000,
  headers: {
    'X-Custom-Header': 'foobar',
  },
});

export default instance;
