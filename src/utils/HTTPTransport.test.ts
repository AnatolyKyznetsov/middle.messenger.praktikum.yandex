import { expect } from 'chai';
import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport', () => {
    const requests: SinonFakeXMLHttpRequest[] = [];
    const endpoint = '/';
    const url = 'test';
    const key = 'test';
    const value = '123';
    const options: Record<string, any> = {
        data: {},
        headers: {},
    };

    options.data[key] = value;
    options.headers[key] = value;

    beforeEach(() => {
        const XHR = sinon.useFakeXMLHttpRequest();

        (global.XMLHttpRequest as unknown) = XHR;

        XHR.onCreate = (xhr) => {
            requests.push(xhr);
        }
    });

    afterEach(() => {
        requests.length = 0;
    });

    it('should maket Get request', () => {
        const transport = new HTTPTransport(endpoint);

        transport.get(url);

        expect(requests[0].method).to.eq('GET');
    });

    it('should maket Put request', () => {
        const transport = new HTTPTransport(endpoint);

        transport.put(url, options);

        expect(requests[0].method).to.eq('PUT');
    });

    it('should maket Post request', () => {
        const transport = new HTTPTransport(endpoint);

        transport.post(url, options);

        expect(requests[0].method).to.eq('POST');
    });

    it('should maket Delete request', () => {
        const transport = new HTTPTransport(endpoint);

        transport.delete(url, options);

        expect(requests[0].method).to.eq('DELETE');
    });

    it('should set passed headers', () => {
        const transport = new HTTPTransport(endpoint);

        transport.post(url, options);

        expect(requests[0].requestHeaders).have.property(key);
    });

    it('should set passed data', () => {
        const transport = new HTTPTransport(endpoint);

        transport.post(url, options);

        expect(JSON.parse(requests[0].requestBody)).have.property(key);
    });
});
