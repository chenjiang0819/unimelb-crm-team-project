import _axios from "axios";

const axios = () => {
  const instance = _axios.create({
    baseURL: process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL : "http://localhost:3000",
  });
  return instance;
};

export default axios();
