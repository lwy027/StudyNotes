//链表中有一个一个的节点node，noed中有每一项itme和指向下一个node的next
//所以我们需要封装2个类，整体链表是一个类，一个node是一个

//每一个Node类
class Node<T> {
  item: T;
  next: Node<T> | null;
  constructor(item: T) {
    this.item = item;
    this.next = null;
  }
}

// 封装linkedList类
//里面有2个属性,一个head指向第一个节点，一个size链表的长度
class LinkedList<T> {
  head: Node<T> | null = null;
  private size: number = 0;

  get length() {
    return this.size;
  }
}

export {};
