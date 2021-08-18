import { APIBASE } from './../environment';
import axios from 'axios';

export * from './user';
export * from './url-builder';
export * from './other';

export const http = axios.create({
 baseURL: APIBASE,
});

http.interceptors.request.use((config) => {
 config.headers.Authorization = 'Barer ' + localStorage.token;
 return config;
});