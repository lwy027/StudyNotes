import dayjs from "dayjs"

export default function directiveFtime(app) {

  app.directive("ftime", {
    mounted(el, bindings) {
      //拿到元素的值
      const time = el.textContent
      //拿到自定义指令传来的参数
      let value = bindings.value
      //判断是否有值，如果没有值，则使用默认格式
      if (!value) {
        value = "YYYY-MM-DD HH:mm:ss"
      }
      //使用dayjs对时间进行处理
      const formatTime = dayjs(time).format(value)
      //把处理之后的时间重新展示在页面
      el.textContent = formatTime

    }
  })
}