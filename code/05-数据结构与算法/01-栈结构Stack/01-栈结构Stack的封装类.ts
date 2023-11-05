import IStack from "./type";

class Stack<T = any> implements IStack<T> {
  private data: T[] = [];
  //push添加元素
  push(element: T) {
    this.data.push(element);
  }
  //pop 移除栈顶元素
  pop(): T | undefined {
    return this.data.pop();
  }
  //peek返回栈顶的元素，不对栈做任何修改（这个方法不会移除栈顶的元素，仅仅返回它）
  peek(): T | undefined {
    return this.data[this.data.length - 1];
  }
  //判断数组中是否有元素，没有返回true
  isEmpty(): boolean {
    return this.data.length === 0;
  }
  //size获取长度
  size(): number {
    return this.data.length;
  }
}

// const stack1 = new Stack<string>();
// stack1.push("aaa");
// stack1.push("bbb");
// stack1.push("ccc");
// console.log(stack1.peek());
// stack1.pop();
// stack1.pop();
// stack1.pop();
// console.log(stack1.isEmpty());
// console.log(stack1.size());

// const stack2 = new Stack<number>();

// stack2.push(111);
// stack2.push(222);
// stack2.push(333);
// console.log(stack2);

export default Stack;
