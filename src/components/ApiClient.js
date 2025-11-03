class ApiClient {
    constructor() {
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.baseUrl = new URL(document.location.origin);
        this.baseUrl.port = "8000";
    }
    url() {
        return this.baseUrl;
    }
}
export default ApiClient;
