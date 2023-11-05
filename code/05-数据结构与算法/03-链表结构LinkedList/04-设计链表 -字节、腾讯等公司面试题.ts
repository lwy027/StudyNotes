class node {
  value: Number;
  next: node | null = null;
  constructor(value: number) {
    this.value = value;
  }
}

class MyLinkedList {
  head: node | null = null;
  private size: number = 0;
  get(index: number): number {
    if (index < 0 && index > this.size) return -1;

    let current = this.head;
    let idx = 0;
    while (idx++ < index && current) {
      current = current?.next;
    }
    return current?.value as number;
  }

  addAtHead(val: number): void {
    const newNode = new node(val);
    if (!this.head) {
      this.head = newNode;
      this.size++;
    }
  }

  addAtTail(val: number): void {
    const newNode = new node(val);
    if (this.head) {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
      this.size++;
    }
  }

  addAtIndex(index: number, val: number): void {
    if (index < 0 && index > this.size) return;

    const newNode = new node(val);
    let current = this.head;
    let idx = 0;
    let previous: node | null = null;
    while (idx++ < index && current) {
      previous = current;
      current = current.next;
    }
    previous!.next = newNode;
    newNode.next = current;
  }

  deleteAtIndex(index: number): void {
    if (index < 0 && index > this.size) return;
    let current = this.head;
    let idx = 0;
    let previous: node | null = null;
    while (idx++ < index && current) {
      previous = current;
      current = current.next;
    }
    previous!.next = current!.next;
  }
  traverse() {
    const values: number[] = [];

    let current = this.head;
    while (current) {
      values.push(current.value as number);
      current = current.next;
    }
    console.log(values.join("->"));
  }
}

var obj = new MyLinkedList();
obj.addAtHead(1);
obj.addAtTail(2);
obj.addAtTail(3);
obj.addAtTail(4);
obj.traverse();
obj.addAtIndex(2, 0);
obj.deleteAtIndex(3);
obj.traverse();
var param_1 = obj.get(2);

console.log(param_1);
obj.traverse();
