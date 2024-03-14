// axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://nicolos-backend.onrender.com/",
  // baseURL: "http://localhost:4000/",
  timeout: 10000,
  headers: {
    "X-Custom-Header": "foobar",
  },
});

export default instance;


// [5:39 pm, 13/03/2024] Nicola: I cannot approve someone
// [5:39 pm, 13/03/2024] Nicola: Im missing data
// [5:39 pm, 13/03/2024] Nicola: I think
// [5:39 pm, 13/03/2024] Nicola: this requires a lot more work