import { Observable } from "rxjs";

//观察着初始化，在被订阅时会立即推送值1,2,3,并在subscribe订阅1秒之后推送值4
const observable = new Observable((subscribe) => {
  subscribe.next(1);
  subscribe.next(2);
  subscribe.next(3);
  setTimeout(() => {
    subscribe.next(4);
    subscribe.complete();
  }, 1000);
});

//进行订阅
console.log("just before subscribe");
//subscribe函数相当于调用了Observable的函数参数
observable.subscribe({
  //当可观察者被订阅时，next推送的值会推送到这里next函数中
  next(x) {
    console.log(x);
  },
  //错误处理函数
  error(err) {
    console.error("something wrong occurred: " + err);
  },
  //完成函数
  complete() {
    console.log("done");
  },
});

//函数写法，相当于帮我们调用了next函数
observable.subscribe((subscribe) => {
  console.log(subscribe);
});
console.log("just after subscribe");

//总结：Observable可观察者模式,相当于生产者，实例相当于消费者
//当消费者进行订阅操作时，就会调用Observable的函数参数，生产者进行推送操作，订阅者进行拉取操作
//在消费者订阅时，传递的函数会当作生产者的参数进行调用操作
//消费者的参数有2中写法，第一中对象写法，可以有3个函数有不同的作用,next,error,complete
//第二种函数写法，内部默认当成next函数调用
