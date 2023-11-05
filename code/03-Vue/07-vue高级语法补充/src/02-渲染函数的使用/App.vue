<script >
import { h, ref } from 'vue';

export default {


  setup() {

    let counter = ref(0)

    // return () => h("div", { class: "bar" }, [
    //   h("span", "我是span元素")
    // ])

    return () => h("div", { class: "bar" }, [
      h("p", null, `当前计数${counter.value}`),
      h("button", {
        onclick() {
          counter.value++
        }
      }, "+1"),
      h("button", {
        onclick() {
          counter.value--
        }
      }, "-1")
    ])

  }
}

</script>



<style lang="less" scoped>
.bar {
  color: red;
  border: 1px solid red;
}
</style>