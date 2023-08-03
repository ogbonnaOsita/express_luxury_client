import axios from "axios";

export const makeRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

export const makeAuthorizedRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Authorization:
      "Bearer" + " " + JSON.parse(localStorage.getItem("JWT_TOKEN")),
  },
});
