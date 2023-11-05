export default function unit(app) {


  app.directive("unit", {
    mounted(el, bindings) {
      const defaultValue = el.textContent
      const value = bindings.value

      if (!value) {
        el.textContent = "￥" + defaultValue
      } else {
        el.textContent = bindings.value + defaultValue
      }
      console.log(el, bindings)
    }
  })


}