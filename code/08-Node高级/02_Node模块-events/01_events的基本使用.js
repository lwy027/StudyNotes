//这里拿到的是events的类
const EventEmitter = require("events");
//events模块类似与事件总线exentBus

//创建event实例
const emitter = new EventEmitter();

function handleLwy(name, age, height) {
  console.log("接收事件成功", name, age, height);
}
//监听事件
emitter.on("lwy", handleLwy);

setTimeout(() => {
  //发出携带参数的事件
  emitter.emit("lwy", "lwy", 20, 188);

  //取消监听事件，这里在第一个延时器中取消监听了lwy事件
  //所有emitter.on就不会在监听到lwy事件
  emitter.off("lwy", handleLwy);
  setTimeout(() => {
    //发出事件
    emitter.emit("lwy");
  }, 1000);
}, 2000);
