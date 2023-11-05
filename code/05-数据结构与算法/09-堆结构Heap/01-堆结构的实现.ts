import { cbtPrint } from "hy-algokit";

export default class Heap<T> {
  private data: T[] = [];

  private size: number = 0;

  //通过索引交换位置，实现过滤操作
  private swap(i: number, j: number) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  print() {
    cbtPrint(this.data);
  }

  //：在堆中插入一个新元素。
  insert(value: T) {
    //在数组尾部添加元素
    this.data.push(value);
    this.size++;
    this.heap_up();
  }
  private heap_up() {
    //2.对添加元素，进行上滤操作
    //2.1拿到添加元素索引
    let index = this.size - 1;

    while (index > 0) {
      //2.2根据索引拿到当前节点父节点索引
      let parentIndex = Math.floor((index - 1) / 2);

      //2.3根据索引拿到对应的值，如果添加的值>父节点，那么进行值的交换操作
      if (this.data[index] <= this.data[parentIndex]) {
        break;
      }
      //2.4进行位置转换
      this.swap(index, parentIndex);
      //下标改变，可以再次进行过滤操作
      index = parentIndex;
    }
  }

  //删除最大/最小元素
  extract() {
    //1.没有元素或者元素为1的情况
    if (this.size === 0) return null;
    if (this.size === 1) {
      this.size--;
      return this.data.pop();
    }

    //2.获取想要删除的元素
    const max = this.data[0];
    //将最后一个节点等于第一个节点，后面使用下滤操作，实现堆
    //这样可以保证，叶子节点任然是完全二叉树
    this.data[0] = this.data.pop()!;
    this.size--;
    this.heap_down(0);
    return max;
  }

  private heap_down(idx: number) {
    //纪律第一个节点下标
    let index = idx;
    while (2 * index + 1 < this.size) {
      //记录左子节点和右子节点下标
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = leftChildIndex + 1;

      //记录左右子节点最大的值
      let larageIndex = leftChildIndex;

      if (
        rightChildIndex < this.size &&
        this.data[leftChildIndex] < this.data[rightChildIndex]
      ) {
        larageIndex = rightChildIndex;
      }
      //如果父节点>子节点，则不进行进行操作，否则，进行换位操作
      if (this.data[index] > this.data[larageIndex]) {
        break;
      }

      this.swap(index, larageIndex);

      index = larageIndex;
    }
  }

  //返回堆中最大/最小元素
  peek() {
    return this.data[0];
  }
  //判断是否为空
  isEmpty() {
    return this.data.length === 0;
  }
  //通过一个列表创建堆
  buildHeap(arr: T[]) {
    this.data = arr;
    this.size = arr.length;
    //找到叶子节点的父节点，进行下滤操作
    const start = Math.floor((this.size - 1) / 2);
    for (let i = start; i >= 0; i--) {
      this.heap_down(i);
    }
  }
}

const arr = [19, 100, 36, 17, 3, 25, 1, 2, 7];

const heap = new Heap();

// for (let item of arr) {
//   heap.insert(item);
// }

// for (let item of arr) {
//   console.log(heap.extract());
// }
heap.buildHeap([19, 100, 36, 17, 3, 25, 1, 2, 7]);

// heap.print();

export {};
