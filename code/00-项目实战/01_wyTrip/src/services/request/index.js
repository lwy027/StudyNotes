import axios from "axios"
import { BASE_URL, TIMEOUT } from './config.js'

import useLoadingStore from "../../stores/modules/loading.js"
const loadingStore = useLoadingStore()



class wyRequest {

  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    this.instance.interceptors.request.use(res => {

      loadingStore.isLoading = true

      return res
    }, err => {
      return new Error("请求失败", err)
    })
    this.instance.interceptors.response.use(res => {

      loadingStore.isLoading = false

      return res
    }, err => {
      loadingStore.isLoading = false

      return new Error("响应失败", err)
    })
  }


  request(config) {
    // mainStore.isLoading = true
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
        // mainStore.isLoading = false
      }).catch(err => {
        reject(err)
        // mainStore.isLoading = false
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }



}

export default new wyRequest(BASE_URL, TIMEOUT)