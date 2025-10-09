import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002',  // backend NestJS
  withCredentials: true,  // pour envoyer les cookies avec chaque requête 
});

export default api;
