import Axios, { AxiosInstance } from 'axios';

class Client {
  public static create(baseURL: string, apiKey: string, apiKeyHeader: string): AxiosInstance {
    const headerObj = {};
    headerObj[`${apiKeyHeader}`] = apiKey;
    return Axios.create({
      baseURL,
      headers: { ...headerObj },
    });
  }
}
export default Client;
