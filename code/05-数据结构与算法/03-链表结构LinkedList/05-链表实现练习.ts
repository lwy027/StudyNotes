class Node<T> {
  next: Node<T> | null = null;
  constructor(public value: T) {}
}

class LinkedList<T> {
  head: Node<T> | null = null;
  private size: number = 0;

  private getNode(position: number) {
    let current = this.head;
    let index = 0;
    while (index++ < position && current) {
      current = current.next;
    }
    return current;
  }

  append(element: T) {
    const newNode = new Node(element);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
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
  insert(elelment: T, position: number) {
    if (position < 0 || position > this.size) return false;
    const newNode = new Node(elelment);
    let current = this.head;
    if (position === 0) {
      newNode.next = current;
      this.head = newNode;
    } else {
      let previous: Node<T> | null = null;
      let index = 0;
      while (index++ < position && current) {
        previous = current;
        current = current.next;
      }
      previous!.next = newNode;
      newNode.next = current;
    }
    this.size++;
  }

  removeAt(position: number) {
    if (position < 0 || position > this.size) return false;
    let current = this.head;
    if (position === 0) {
      this.head = this.head?.next ?? null;
    } else {
      let previous: Node<T> | null = null;
      let index = 0;
      while (index++ < position && current) {
        previous = current;
        current = current.next;
      }
      previous!.next = current?.next ?? null;
    }
    this.size--;
  }

  updata(elelment: T, position: number) {
    if (position < 0 || position > this.size) return false;
    const current = this.getNode(position);

    if (current) {
      current.value = elelment;
    }
  }

  indexOf(elelment: T) {
    let current = this.head;

    let index = 0;

    while (current) {
      if (current?.value === elelment) {
        return index;
      }
      index++;
      current = current?.next ?? null;
    }

    return -1;
  }
}

const linkedList = new LinkedList();
linkedList.append("aaa");
linkedList.append("bbb");
linkedList.append("ccc");
linkedList.traverse();
linkedList.insert("ddd", 0);
linkedList.traverse();
linkedList.insert("eee", 2);
linkedList.traverse();
linkedList.removeAt(0);
linkedList.traverse();
linkedList.removeAt(2);
linkedList.traverse();
console.log(linkedList.indexOf("ccc"));
linkedList.traverse();

export {};
