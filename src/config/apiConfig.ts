// src/config/apiConfig.ts

const LOCAL_API = "https://localhost:7114/api";
const PROD_API = "https://cleanify-k133.onrender.com/api";


export const API_BASE_URL =
  process.env.NODE_ENV === "development" ? LOCAL_API : PROD_API;
