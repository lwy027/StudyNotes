import { first, map, of, pipe } from "rxjs";

//每一个操作符都是Observable的实例

//创建操作符of:创建一个observale
//管道pipe:可以连通observalue实例的操作符，并返回一个新的observable,订阅逻辑基于第一个
of(1, 2, 3)
  .pipe(map((x) => x * x))
  .subscribe((y) => console.log("got value: " + y));
//first获取第一个有用的值
of(1, 2, 3)
  .pipe(first())
  .subscribe((y) => console.log("got value: " + y));
