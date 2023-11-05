import { defineStore } from "pinia";
import { ref } from "vue"

const useLoadingStore = defineStore("loading", () => {

  let isLoading = ref(false)

  return {
    isLoading
  }


})

export default useLoadingStore