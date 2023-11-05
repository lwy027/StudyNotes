import dayjs from "dayjs"

export function formatMonthDay(data) {
  return dayjs(data).format("MM月DD日")
}

export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day")
}