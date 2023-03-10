interface IOptions {
    [key: string]: any,
}

type HTTPMethod = (url: string, options?: IOptions, timeout?: number) => Promise<unknown>

enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

function queryStringify(data: IOptions = {}): string {
    let result = '?';

    Object.entries(data).forEach(([ name, value ]) => {
        result += `${name}=${value}&`;
    });

    result = result.substring(0, result.length - 1);

    return result;
}

export default class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    }

    post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    }

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    }

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    }

    request: HTTPMethod = (url, options = {}, timeout = 5000) => {
        const { method, data, headers = {} } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const notGet = method !== METHODS.GET;

            xhr.open(method, notGet ? url : `${url}${queryStringify(data)}`);

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            xhr.send(notGet || data ? data : null);
        });
    }
}
