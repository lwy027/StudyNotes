class node<T> {
  value: T;
  next: node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class circularLinkedList<T> {
  private head: node<T> | null = null;
  private size: number = 0;
  //记录最后一个节点，用来指向第一个节点形成循环
  private tail: node<T> | null = null;

  private isLastNode(node: node<T>) {
    return node === this.tail;
  }
  append(value: T) {
    //1.创建节点
    const newNode = new node(value);
    //2.添加节点
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail!.next = newNode;
    }
    this.tail! = newNode;
    this.size++;
  }

  traverse() {
    const values: T[] = [];

    let current = this.head;
    while (current) {
      values.push(current.value);
      if (this.isLastNode(current)) {
        current = null;
      } else {
        current = current.next;
      }
    }
    if (this.head) {
      values.push(this.head!.value);
    }
    console.log(values.join("->"));
  }

  private getNode(position: number) {
    let current = this.head;
    let index = 0;
    while (index++ < position) {
      current = current!.next;
    }
    return current;
  }

  insert(value: T, position: number) {
    if (position < 0 && position > this.size) return;

    const newNode = new node(value);
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
      this.tail!.next = this.head;
    } else {
      const previous = this.getNode(position - 1);
      newNode.next = previous?.next ?? null;
      previous!.next = newNode;
    }
    if (position === this.size) {
      this.tail = newNode;
    }
    this.size++;
  }

  removeAt(position: number) {
    if (position < 0 && position > this.size) return;

    let current = this.head;
    if (position === 0) {
      this.head = current?.next ?? null;
      this.tail!.next = this.head;
    } else {
      const previous = this.getNode(position - 1);
      const current = previous?.next;
      previous!.next = current?.next ?? null;
      if (position === this.size) {
        this.tail = previous ?? null;
      }
    }

    if (position === this.size) {
      this.tail!.next = this.head;
    }

    this.size--;
    return current?.value;
  }

  updata(element: T, position: number) {
    if (position < 0 && position > this.size) return;

    const current = this.getNode(position);
    if (current) {
      current.value = element;
    }

    if (position === this.size) {
      this.tail = current;
      this.tail!.next = this.head;
    }
  }

  indexOf(element: T) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === element) {
        return index;
      }
      if (this.isLastNode(current)) {
        current = null;
      } else {
        current = current.next;
      }
      index++;
    }
  }
}

const cLinkedList = new circularLinkedList();

cLinkedList.append("aaa");
cLinkedList.append("bbb");
cLinkedList.append("ccc");

cLinkedList.traverse();

cLinkedList.insert("abc", 0);
cLinkedList.traverse();
cLinkedList.insert("cba", 3);
cLinkedList.traverse();
cLinkedList.insert("nba", 5);
cLinkedList.traverse();
cLinkedList.removeAt(6);
cLinkedList.traverse();
cLinkedList.updata("jjj", 0);
cLinkedList.traverse();

export {};
