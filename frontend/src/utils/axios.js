import axios from "axios";

const instance = axios.create({
  baseURL: "https://next-job-rho.vercel.app/api/v1",
  withCredentials: true
});

export default instance;