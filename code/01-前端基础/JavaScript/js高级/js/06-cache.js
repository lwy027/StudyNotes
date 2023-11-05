class cache{

  constructor(isStorage = true) {
    //使用构造函数金可以实现使用2种不同得到储存
     this.storage = isStorage? localStorage:sessionStorage
  }
   
  set(key, value) {
        //如果vlue为一个对象时，浏览器会解析成[Object Object]字符串类型所有使用JSON解析成JSON字符串卡类型
    this.storage.setItem(key,JSON.stringify(value))   
  }
  get(key) {
    const result = this.storage.getItem(key)
    //如果result为Undefined浏览器会报错
    if (result) {
      return JSON.parse(result)
    }
  }
  remove(key) {
   this.localStorage.removeItem(key)
  }

  clear() {
     this.storage.clear()
   }

}

const localCache = new cache()
const sessionCache = new cache(false)