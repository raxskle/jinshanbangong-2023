import axios from "axios";

const webURL = "http://localhost:3001";
const ConfigBaseURL = `${webURL}/api`;

const instance = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  timeout: 10000,
  baseURL: ConfigBaseURL, //接口请求地址
});

export default instance;
