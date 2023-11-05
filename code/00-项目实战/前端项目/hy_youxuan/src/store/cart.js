import { defineStore } from 'pinia'

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartList: []
  }),
  getters: {
    isSelectAll(state) {
      for (const item of state.cartList) {
        if (!item.selected) return false
      }
      return true
    }
  },
  actions: {
    addProductToCart(product) {
      let findProduct = this.cartList.find(item => item.id === product.id)
      if (findProduct) {
        findProduct.count += 1
      } else {
        findProduct = product
        findProduct.count = 1
        this.cartList.push(findProduct)
      }
      findProduct.selected = true
    },

    updateProductCounter(id, counter) {
      const findProduct = this.cartList.find(item => item.id = id)
      if (findProduct) {
        findProduct.count += counter
      }
    },

    updateAllProductSelected(isSelected) {
      this.cartList.forEach(item => item.selected = isSelected)
    },

    deleteProductById(id) {
      const index = this.cartList.findIndex(item => item.id === id)
      this.cartList.splice(index, 1)
    }
  }
})
