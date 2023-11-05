import dayjs from 'dayjs'

export function getFormatCount(count) {
  if (count > 100000000) {
    return Math.floor(count/100000000) + "亿"
  } else if (count > 10000) {
    return Math.floor(count/10000) + "万"
  } else {
    return count
  }
}

export function timestampToDate(timestamp) {
  return dayjs(timestamp * 1000).format("YYYY年MM月DD日")
}