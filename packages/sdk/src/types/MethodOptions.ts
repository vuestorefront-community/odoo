import { AxiosRequestConfig } from 'axios';

/**
 * Definition of the MethodOptions parameter.
 */
export interface MethodOptions {

  /**
   * {@link https://axios-http.com/docs/req_config | AxiosRequestConfig} object
   * You can use it to override Axios request configuration
   */
  axiosRequestConfig?: Readonly<AxiosRequestConfig>;

  /**
   * Additional optional fields. Its usage depends on the custom implementation.
   */
  [key: string]: any;
}
