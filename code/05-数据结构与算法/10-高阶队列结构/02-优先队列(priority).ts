import Heap from "../09-堆结构Heap/01-堆结构的实现";
class priorityNode<T> {
  constructor(public value: T, public priority: T) {}

  //必须要实现这个方法，为了类内部可以读取到这个值，如果没有堆结构就不知道读取什么值
  //会是[object Object]这种形式
  valueOf() {
    return this.priority;
  }
}

class priorityQueue<T> {
  private heap: Heap<priorityNode<T>> = new Heap();

  enqueue(value: T, priority: T) {
    const newNode = new priorityNode(value, priority);
    this.heap.insert(newNode);
  }
  print() {
    this.heap.print();
  }

  dequeue() {
    return this.heap.extract();
  }
}

const priority = new priorityQueue();

priority.enqueue("lwy", 20);
priority.enqueue("kkk", 22);
priority.enqueue("lwy", 23);

priority.print();
