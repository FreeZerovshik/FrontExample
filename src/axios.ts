import axios from "axios";

const apiHost = process.env.VUE_APP_API_HOST || "127.0.0.1";
const apiPort = process.env.VUE_APP_API_PORT || "8080";
const apiEnv = process.env.VUE_APP_API_ENV || "test";
const apiProtocol = apiEnv === "prod" ? "https" : "http";
const apiUrl = apiEnv === "prod" ? apiHost : `${apiHost}:${apiPort}`;

export const axiosInstance = axios.create({
  baseURL: `${apiProtocol}://${apiUrl}/api`,
});
