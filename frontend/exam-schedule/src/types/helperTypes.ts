export type resultArray<T> = {
    resultObject: T[],
    successed: boolean,
    resultDescription: {
        statusCode: number,
        loggingMessage: string
    }
}

export type result<T> = {
    resultObject: T,
    successed: boolean,
    resultDescription: {
        statusCode: number,
        loggingMessage: string
    }
}

export type Query = {
    Search?: string;
    PageNumber?: number;
    PageSizeDefault?: number;
    PageSizeCustom?: number;
};