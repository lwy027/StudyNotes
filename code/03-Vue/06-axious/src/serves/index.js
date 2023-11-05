import axios from "axios"

class wyRequest {

  constructor(baseURL, timeout = 5000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
  }


  requeset(config) {
    return new Promise((resolve, reject) => {
      const res = axios.request(config)
      resolve(res.data)
    }).then((res) => {
      console.log(res)
    })
  }

  get(config) {
    return this.requeset({ ...config, methods: "get" })
  }
  post(config) {
    return this.requeset({ ...config, methods: "post" })
  }


}

const instance1 = new wyRequest()
const instance2 = new wyRequest()

export {
  instance1,
  instance2
}