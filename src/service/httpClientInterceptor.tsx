// httpClientInterceptor.ts
import axios, { AxiosRequestConfig, AxiosResponse ,AxiosInstance} from "axios";

export class HttpClient {
  protected instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
    this._initializeRequestInterceptor();
  }

  protected _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  protected _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      async (config: any) => {
        const token = localStorage.getItem("token");

        if (token) {
          config.headers = {
            ...config.headers,
            ["x-access-token"]: `${token}`,
          };
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
  };

  protected _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    document.dispatchEvent(
      new CustomEvent("errorEvent", { detail: error.message })
    );

    return Promise.reject(error);
  };

  // Bu iki metodu protected olarak değiştirdik
  protected _get = (url: string, config?: AxiosRequestConfig) =>
    this.instance.get(url, config);

  protected _post = (url: string, data?: any, config?: AxiosRequestConfig) =>
    this.instance.post(url, data, config);
}
