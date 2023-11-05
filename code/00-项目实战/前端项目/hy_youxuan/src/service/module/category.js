import hyRequest from '../index'

// http://xiongmaoyouxuan.com/api/tab/2?start=0
export function getCategoryData(id = 0, start = 0) {
  return hyRequest.get(`/tab/${id}?start=${start}`) // 数据格式： 看hometabcategories.json
}

export function getSubCategoryData(id = 0, start = 0) {
  return hyRequest.get(`/category/${id}/items?start=${start}`) // 数据格式： 看hometabcategories.json
}


