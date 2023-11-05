import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
class HYRequest {
  constructor(baseURL, timeout) {
    this.instance = axios.create({ baseURL, timeout })

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
     (config) => {
       // 顶部 和 右上角添加进度条
       NProgress.start()
       return config
     },
     (err) => {
       return err
     })
  

    this.instance.interceptors.response.use(
     (res) => {
       // 将loading移除
       NProgress.done()
       return res
     },
     (err) => {
       // 将loading移除
       NProgress.done();
       return err
     })

  }

  request(url, method, data) {
    return new Promise((resolve, reject) => {
      this.instance({
        url,
        method,
        params: data,
        data
      }).then(res => resolve(res.data)).catch(reject)
    })
  }

  get(url, params) {
    return this.request(url, "GET", params)
  }

  post(url, data) {
    return this.request(url, "POST", data)
  }
}

export default HYRequest
