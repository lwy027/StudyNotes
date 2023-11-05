import Queue from "../02-队列结构Queue/01-队列结构的封装类";

//双端队列的特点:允许在队列的两端添加（入队）和删除（出队）元素。
class deque<T> extends Queue<T> {
  //添加在最前面
  addFront(value: T) {
    this.data.unshift(value);
  }

  //
  removeRear() {
    return this.data.pop();
  }
}
