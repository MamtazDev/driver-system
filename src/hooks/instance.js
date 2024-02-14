// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000,
  headers: {
    'X-Custom-Header': 'foobar',
  },
});

export default instance;
