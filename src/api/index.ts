import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3010/api/",
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log("response failed", err);
    if (err.response.data.err) {
      throw new Error(err.response.data.err);
    } else {
      throw new Error("response failed");
    }
  }
);

export default axiosInstance;
