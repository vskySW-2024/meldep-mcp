// @ts-nocheck
import axios from 'axios';
const logger = {
    info: (...args) => console.error(...args),
    warn: (...args) => console.error(...args),
    error: (...args) => console.error(...args),
    debug: (...args) => console.error(...args),
};
export class HttpClient {
    constructor(baseURL, config) {
        this.client = axios.create({
            baseURL,
            timeout: 10000, // 10 seconds timeout
            headers: {
                'Content-Type': 'application/json',
            },
            ...config,
        });
        this.setupInterceptors();
    }
    setupInterceptors() {
        this.client.interceptors.request.use((config) => {
            logger.debug({
                url: config.url,
                method: config.method,
                hasAuthHeader: !!config.headers?.Authorization,
            }, 'HTTP Request');
            return config;
        }, (error) => {
            logger.error({ error }, 'HTTP Request Error');
            return Promise.reject(error);
        });
        this.client.interceptors.response.use((response) => {
            logger.debug({ response }, 'HTTP Response');
            return response;
        }, (error) => {
            logger.error({ error }, 'HTTP Response Error');
            return Promise.reject(error);
        });
    }
    async get(url, config) {
        return this.client.get(url, config);
    }
    async post(url, data, config) {
        return this.client.post(url, data, config);
    }
    async put(url, data, config) {
        return this.client.put(url, data, config);
    }
    async delete(url, config) {
        return this.client.delete(url, config);
    }
    setAuthToken(token) {
        this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    removeAuthToken() {
        delete this.client.defaults.headers.common['Authorization'];
    }
}
