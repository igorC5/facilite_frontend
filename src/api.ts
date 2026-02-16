import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333", // coloque sua API aqui
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});