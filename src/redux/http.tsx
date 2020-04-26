export interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

// HTTP helper for clean requests
export async function http<T>(endpoint: string): Promise<HttpResponse<T>> {
    
    const response: HttpResponse<T> = await fetch(endpoint);
    
    try {
        response.parsedBody = await response.json();
    }
    catch (ex) {
        // There is no body
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
}