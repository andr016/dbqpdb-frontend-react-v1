import axios from 'axios';
import Config from './Config';

class ApiClient {
  public baseUrl: string;

  constructor() {
    this.baseUrl = Config.baseUrl; // or from Config
  }

  get<T>(url: string, headers?: Record<string, string>) {
    return axios.get<T>(new URL(url, this.baseUrl).href, { headers });
  }

  post<T>(url: string, data: any, headers?: Record<string, string>) {
    return axios.post<T>(new URL(url, this.baseUrl).href, data, { headers });
  }

  delete(url: string, headers?: Record<string, string>) {
    return axios.delete(new URL(url, this.baseUrl).href, { headers });
  }
}

export default ApiClient;