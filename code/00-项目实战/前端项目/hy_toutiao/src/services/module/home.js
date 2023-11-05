import hyRequest from '../index'

export function getHotRanking(offset = 0, size = 10) {
  return hyRequest.get("/hot/ranks", {
    offset,
    size
  })
}

export function getHotVideos(offset = 0, size = 10) {
  return hyRequest.get("/hot/video", {
    offset,
    size
  })
}

export function getNewsList(offset = 0, size = 10, channel_id = 0) {
  return hyRequest.get("/news", {
    offset,
    size,
    channel_id
  })
}
