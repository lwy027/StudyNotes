import wyRequest from '../request'

// 请求全部城市数据
export function getCityAll() {
  return wyRequest.get({
    url: "/city/all"
  })
}