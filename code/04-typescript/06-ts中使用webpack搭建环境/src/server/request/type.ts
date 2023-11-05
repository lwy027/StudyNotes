import { AxiosRequestConfig, AxiosResponse } from "axios";


interface Wyinterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: any) => any,
  requestFailureFn?: (err: any) => any,
  responseSuccessFn?: (res: T) => T,
  resposeFailureFn?: (err: any) => any,
}

export interface WyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Wyinterceptors<T>
}
