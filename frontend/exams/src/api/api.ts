import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface FetchResponse {
    data: any;
    headers: any;
    status: number;
}

export async function handleFetch(url: string, method: string, body?: any): Promise<FetchResponse> {
    const baseUrl = 'http://localhost:5161/api'; // Change this to your base URL

    try {
        let axiosConfig: AxiosRequestConfig = {
            method: method,
            url: baseUrl + url,
            headers: {
                'Content-Type': 'application/json'
                // Add any other headers if needed
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
