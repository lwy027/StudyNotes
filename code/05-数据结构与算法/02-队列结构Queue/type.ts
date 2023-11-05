interface IQueue<T> {
  enqueue(elelment: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}

export default IQueue;
