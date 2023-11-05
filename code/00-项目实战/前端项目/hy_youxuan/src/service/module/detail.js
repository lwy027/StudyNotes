import hyRequest from '../index'

export function getProductDetail(id) {
  return hyRequest.get("/detail", {
    id
  })
}
