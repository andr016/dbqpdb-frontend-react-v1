import axios from 'axios';
import Config from './Config';
class ApiClient {
    constructor() {
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.baseUrl = Config.baseUrl; // or from Config
    }
    get(url, headers) {
        return axios.get(new URL(url, this.baseUrl).href, { headers });
    }
    post(url, data, headers) {
        return axios.post(new URL(url, this.baseUrl).href, data, { headers });
    }
    delete(url, headers) {
        return axios.delete(new URL(url, this.baseUrl).href, { headers });
    }
}
export default ApiClient;
