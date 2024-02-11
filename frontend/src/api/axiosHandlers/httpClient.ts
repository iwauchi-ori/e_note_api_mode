import axios from 'axios';

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    timeout: 1000 * 60,
  },
});

export const httpClient = client;

// export const downLoadCsvClient = axios.create({
//   baseURL: process.env.API_BASE_URL,
//   headers: { accept: "text/csv", timeout: 1000 * 60 },
//   responseType: "blob",
// });
