const EventEmitter = require("events");

const emitter = new EventEmitter();

function handleE() {}

emitter.on("lwy", handleE);
emitter.on("kobi", handleE);
emitter.on("yyy", handleE);

emitter.once("click", () => {
  console.log("我只会执行一次");
});
emitter.prependListener("click", () => {
  console.log("我会优先执行，不会只执行一次");
});
emitter.prependOnceListener("click", () => {
  console.log("我会优先执行,但是我只会执行一次");
});

emitter.emit("click");
emitter.emit("click");
emitter.removeAllListeners("click");
console.log(emitter.eventNames());
console.log(emitter.getMaxListeners());
console.log(emitter.listenerCount("lwy"));
console.log(emitter.listeners("yyy"));
