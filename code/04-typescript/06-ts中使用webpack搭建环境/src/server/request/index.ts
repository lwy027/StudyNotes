import axios from "axios";
import { AxiosInstance } from "axios";
import { BASE_URL, TIME_OUT } from "../config";
import { WyRequestConfig } from "./type";


class WYRequest {
  instance: AxiosInstance

  constructor(config: WyRequestConfig) {
    this.instance = axios.create(config)
    //全局拦截器
    this.instance.interceptors.request.use(config => {
      console.log("全局请求拦截成功")
      return config
    }, err => {
      console.log("全局请求失败")
      return err
    })
    this.instance.interceptors.response.use(res => {
      console.log("全局请求响应成功")
      return res.data
    }, err => {
      console.log("全局响应失败")
      return err
    })

    //单个请求拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.resposeFailureFn
      )
    }

  }
  request<T = any>(config: WyRequestConfig<T>) {
    //针对单个请求设置请求拦截器
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    //单个请求设置响应拦截器，因为我们直接把响应给返回出去了，所以正常时不能回调单个响应拦截器
    //所以在promise中进行操作
    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config).then(res => {
        if (config.interceptors?.responseSuccessFn) {
          res = config.interceptors.responseSuccessFn(res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })

    })
  }

  get<T = any>(config: WyRequestConfig<T>) {
    this.request({ ...config, method: "get" })
  }
  post<T = any>(config: WyRequestConfig<T>) {
    this.request({ ...config, method: "post" })
  }
  delete<T = any>(config: WyRequestConfig<T>) {
    this.request({ ...config, method: "DELETE" })
  }
  patch<T = any>(config: WyRequestConfig<T>) {
    this.request({ ...config, method: "PATCH" })
  }
}

const wyRequest = new WYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

//实现不同的请求地址有不同的拦截器
export const wyRequest2 = new WYRequest({
  baseURL: "http://codercba.com:1888/airbnb/api",
  timeout: 8000,
  interceptors: {
    requestSuccessFn(config) {
      console.log("爱彼迎的请求拦截")
      return config
    },
    requestFailureFn(err) {
      return err
    },
    responseSuccessFn(res) {
      console.log("爱彼迎的响应成功拦截")
      console.log(res)
      return res.data
    },
    resposeFailureFn(err) {
      return err
    }
  }

})


export default wyRequest
