
import hyRequest from '../index'

// http://localhost:8080/youxuan/api/column/29
// http://xiongmaoyouxuan.com/api/column/29
export function getSubColumns(id = 29) {
  return hyRequest.get(`/column/${id}`) // 数据格式在docs的 subColumns.json
}


export function getSubColumnItems(id=0, start = 0) {
  return hyRequest.get(`/sub_column/${id}/items?start=${start}`) // 数据格式在docs的 subColumnData.ejson
}


