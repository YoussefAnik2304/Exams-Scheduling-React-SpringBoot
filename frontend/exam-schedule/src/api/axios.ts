import axios from 'axios';
const BASE_URL = "http://localhost:5014/api/";
export const HOST = "http://localhost:5014";
export const AxiosWithoutToken = axios.create({
    baseURL: BASE_URL
});

const token = localStorage.getItem("token");
export const AxiosWithAuth = axios.create({
    headers: {
        Authorization: token! ? `Bearer ${token!}` : ''
    }
});