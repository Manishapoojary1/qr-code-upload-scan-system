import axios from "axios";

const api = axios.create({
  baseURL: "https://qr-backend-nvaj.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
