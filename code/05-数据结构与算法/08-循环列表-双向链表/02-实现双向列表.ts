class DoublyNode<T> {
  value: T;
  next: DoublyNode<T> | null = null;
  prev: DoublyNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class DoublyLinkedList<T> {
  private head: DoublyNode<T> | null = null;

  private tail: DoublyNode<T> | null = null;
  private size: number = 0;

  append(value: T) {
    const newNode = new DoublyNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.size++;
  }

  traverse() {
    const values: T[] = [];

    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }

    console.log(values.join("->"));
  }

  postTraverse() {
    const values: T[] = [];

    let current = this.tail;
    while (current) {
      values.push(current.value);

      current = current.prev;
    }
    console.log(values.join("->"));
  }

  prepend(value: T) {
    const newNode = new DoublyNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.size++;
  }

  insert(element: T, position: number) {
    if (position < 0 && position > this.size) return;

    if (position === 0) {
      this.prepend(element);
    } else if (position === this.size) {
      this.append(element);
    } else {
      const newNode = new DoublyNode(element);

      let current = this.head;
      let index = 0;
      while (index++ < position) {
        current = current!.next;
      }
      current!.prev!.next = newNode;
      newNode.prev = current!.prev;
      current!.prev = newNode;
      newNode.next = current;
    }
    this.size++;
  }

  removeAt(position: number) {
    if (position < 0 && position > this.size) return;

    let current = this.head;
    if (position === 0) {
      if (this.size === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head!.next;
        this.head!.prev = null;
      }
    } else if (position === this.size - 1) {
      console.log(this.size);
      current = this.tail;
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    } else {
      let index = 0;
      while (index++ < position) {
        current = current!.next;
      }

      current!.prev!.next = current!.next ?? null;
      current!.next!.prev = current!.prev ?? null;
    }
    this.size--;
    return current?.value;
  }
}

const DLinkedList = new DoublyLinkedList();

DLinkedList.append("aaa");
DLinkedList.append("bbb");
DLinkedList.append("ccc");
DLinkedList.traverse();
DLinkedList.postTraverse();

DLinkedList.prepend("ddd");
DLinkedList.traverse();
DLinkedList.postTraverse();

DLinkedList.insert("iii", 0);
DLinkedList.traverse();
DLinkedList.postTraverse();

DLinkedList.insert("lll", 4);
DLinkedList.traverse();
DLinkedList.postTraverse();

console.log(DLinkedList.removeAt(6));

export {};
