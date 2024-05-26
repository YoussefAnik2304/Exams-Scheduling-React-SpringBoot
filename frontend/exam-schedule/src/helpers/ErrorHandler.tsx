import axios from "axios";

export const ErrorHandler = (error: unknown) => {

    if (axios.isAxiosError(error)) {

        if(error.response) {
            const responseData = error.response.data;
            const responseDataErrors = responseData.errors;
            if(responseDataErrors){
                return Object.keys(responseDataErrors)[0][0];
            }
            else {
                return responseData.loggingMessage;
            }
        }
    }
};