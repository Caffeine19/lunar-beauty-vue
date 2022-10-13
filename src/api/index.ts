import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "/http://localhost:3008/api/",
  timeout: 1000,
});
export const reqProjectFindOverview = () => {
  return axiosInstance.post("/project/findOverview");
};
