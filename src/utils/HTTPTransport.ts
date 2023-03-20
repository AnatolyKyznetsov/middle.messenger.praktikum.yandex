import { API_URL } from '../config';

interface IOptions {
    [key: string]: any,
}

type HTTPMethod = (url: string, options?: IOptions) => Promise<unknown>

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
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = `${API_URL}${endpoint}`;
    }

    public get: HTTPMethod = (url, options = {}) => {
        return this._request(`${this.endpoint}${url}`, { ...options, method: METHODS.GET });
    }

    public post: HTTPMethod = (url, options = {}) => {
        return this._request(`${this.endpoint}${url}`, { ...options, method: METHODS.POST });
    }

    public put: HTTPMethod = (url, options = {}) => {
        return this._request(`${this.endpoint}${url}`, { ...options, method: METHODS.PUT });
    }

    public delete: HTTPMethod = (url, options = {}) => {
        return this._request(`${this.endpoint}${url}`, { ...options, method: METHODS.DELETE });
    }

    private _request: HTTPMethod = (url, options = {}) => {
        const { method, data, headers = { 'Content-Type': 'application/json' } } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const notGet = method !== METHODS.GET;

            xhr.open(method, notGet ? url : `${url}${queryStringify(data)}`);

            xhr.withCredentials = true;
            xhr.responseType = 'json';

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.onabort = () => reject({ reason: 'abort' });
            xhr.onerror = () => reject({ reason: 'network error' });
            xhr.ontimeout = () => reject({ reason: 'timeout' });

            if (notGet || data ) {
                xhr.send(options.noStringify ? data : JSON.stringify(data));
            } else {
                xhr.send();
            }
        });
    }
}
