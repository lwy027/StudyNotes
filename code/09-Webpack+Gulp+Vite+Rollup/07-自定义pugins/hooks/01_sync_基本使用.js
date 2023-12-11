const { AsyncParallelHook } = require("tapable");

class WYComplier {
  constructor() {
    //第一步：创建Hook对象
    this.hooks = {
      syncHook: new AsyncParallelHook(["name", "age"]),
    };
    //第二步：注册Hook中的事件(自定义plugin)
    this.hooks.syncHook.tap("event1", (name, age) => {
      console.log("event1", name, age);
    });
    this.hooks.syncHook.tap("event2", (name, age) => {
      console.log("event2", name, age);
    });
    this.hooks.syncHook.tapAsync("event3", (name, age, callback) => {
      console.log("event3", name, age);
      setTimeout(() => {
        console.log("event3", name, age);
        callback();
      }, 3000);
    });
  }
}
//第三步：触发事件 ,事件触发时在syncHook中会监听事件并且执行
//调用call时，事件就会被触发，被上面事件监听到，上面的事件名称只是做一个标识而已
const myComplier = new WYComplier();
myComplier.hooks.syncHook.callAsync("小明", 20);
