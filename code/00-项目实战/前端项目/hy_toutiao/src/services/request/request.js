import axios from 'axios'

class HYRequest {
  constructor(baseURL, timeout) {
    this.instance = axios.create({ baseURL, timeout })
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
