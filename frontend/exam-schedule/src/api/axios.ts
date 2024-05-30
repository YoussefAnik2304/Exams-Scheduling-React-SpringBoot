// import axios from 'axios';
// const BASE_URL = "http://localhost:5014/api/";
// export const HOST = "http://localhost:5014";
// export const AxiosWithoutToken = axios.create({
//     baseURL: BASE_URL
// });
//
// const token = localStorage.getItem("token");
// export const AxiosWithAuth = axios.create({
//     headers: {
//         Authorization: token! ? `Bearer ${token!}` : ''
//     }
// });

// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
//
// interface FetchResponse {
//     data: any;
//     headers: any;
//     status: number;
// }
//
// export async function handleFetch(url: string, method: string, body?: any): Promise<FetchResponse> {
//     const baseUrl = 'http://localhost:8080/'; // Change this to your base URL
//
//     try {
//         let axiosConfig: AxiosRequestConfig = {
//             method: method,
//             url: baseUrl + url,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + localStorage.getItem('token')
//             }
//         };
//
//         // Include request body for non-GET requests
//         if (method !== 'GET' && body) {
//             axiosConfig.data = body;
//         }
//
//         const response: AxiosResponse = await axios(axiosConfig);
//
//         return {
//             data: response.data,
//             headers: response.headers,
//             status: response.status
//         };
//     } catch (error) {
//         // Handle exceptions here
//         console.error('Error:', error);
//         // You can show an error message to the user or perform any other action
//         throw error; // Rethrow the error if you want to handle it in the calling code
//     }
// }

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
export const HOST = "http://localhost:8080";
const baseUrl = 'http://localhost:8080/';
export const AxiosWithoutToken = axios.create({
    baseURL: baseUrl
});

interface FetchResponse {
    data: any;
    headers: any;
    status: number;
}

export async function handleFetch(url: string, method: string, body?: any): Promise<FetchResponse> {
    const baseUrl = 'http://localhost:8080/'; // Change this to your base URL

    try {
        let axiosConfig: AxiosRequestConfig = {
            method: method,
            url: baseUrl + url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        // Include request body for non-GET requests
        if (method !== 'GET' && body) {
            axiosConfig.data = body;
        }

        const response: AxiosResponse = await axios(axiosConfig);

        return {
            data: response.data,
            headers: response.headers,
            status: response.status
        };
    } catch (error) {
        // Handle exceptions here
        console.error('Error:', error);
        // You can show an error message to the user or perform any other action
        throw error; // Rethrow the error if you want to handle it in the calling code
    }
}

// Ensure this matches the import in AuthContext.tsx
export { handleFetch as AxiosWithAuth };


