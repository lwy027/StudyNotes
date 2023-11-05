import hyRequest from '../index'

export function getChoicelessData(offset = 0, size = 12) {
  return hyRequest.get("/choiceless", {
    offset,
    size
  })
}
