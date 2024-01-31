// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/user',
  timeout: 10000,
  headers: {
    'X-Custom-Header': 'foobar',
    'Content-Type': 'application/json',
  },
});

export default instance;
