import axios from "axios";

class ApiClient {
  baseUrl: URL;
  constructor() {
    this.baseUrl = new URL(document.location.origin);
    this.baseUrl.port = "8000";
  }
  public url() {
    return this.baseUrl
  }
}

export default ApiClient