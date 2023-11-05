import IQueue from "./type";

class Queue<T> implements IQueue<T> {
  protected data: T[] = [];
  enqueue(elelment: T): void {
    this.data.push(elelment);
  }
  dequeue(): T | undefined {
    return this.data.shift();
  }
  peek(): T | undefined {
    return this.data[0];
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }
  size(): number {
    return this.data.length;
  }
}

const queue = new Queue<number>();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.dequeue();

// console.log(queue.size());
// console.log(queue);
export default Queue;
