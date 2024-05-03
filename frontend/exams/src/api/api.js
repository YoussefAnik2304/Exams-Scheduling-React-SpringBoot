async function handleFetch(url, method, body) {
    const baseUrl = 'http://localhost:8080'; // Change this to your base URL

    try {
        let requestConfig = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
                // Add any other headers if needed
            }
        };

        // Include request body for non-GET requests
        if (method !== 'GET' && body) {
            requestConfig.body = JSON.stringify(body);
        }

        const response = await fetch(baseUrl + url, requestConfig);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json(); // Assuming response is JSON
    } catch (error) {
        // Handle exceptions here
        console.error('Error:', error);
        // You can show an error message to the user or perform any other action
        throw error; // Rethrow the error if you want to handle it in the calling code
    }
}

