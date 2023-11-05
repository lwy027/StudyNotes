//链表中有一个一个的节点node，noed中有每一项itme和指向下一个node的next
//所以我们需要封装2个类，整体链表是一个类，一个node是一个

//每一个Node类
class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T) {
    this.value = value;
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

  //添加方法
  append(value: T) {
    const newNode = new Node<T>(value);
    if (!this.head) {
      //1.head为空时
      this.head = newNode;
    } else {
      //2.当head不为null时
      let current = this.head;
      //当有下一个元素时，就会循环
      while (current.next) {
        //把current永远都会指向最后一个元素
        current = current.next;
      }
      //最一个元素的next指向新添加的元素
      current.next = newNode;
    }
    this.size++;
  }
  //链表的遍历方法（traverse）
  traverse() {
    const values: T[] = [];
    //记录head
    let current = this.head;
    //只有current有值，进入循环
    while (current) {
      //把value添加进数组中
      values.push(current.value);
      //改变当前current指向为下一个元素
      current = current.next;
    }
    console.log(values.join("->"));
  }
  //insert插入方法
  insert(value: T, position: number): boolean {
    if (position > this.size) return false;
    const newNode = new Node(value);

    //创建一个指针，用变换当前位置
    let current = this.head;
    //1.插入头部
    if (position === 0) {
      //把新元素的next元素指向head头部,
      newNode.next = current;
      //再把头部 = newhead,这样就放在了第一位
      this.head = newNode;
    } else {
      //2.插入到其他位置
      //记录位置
      let index = 0;
      //记录current前一个位置
      let previous: Node<T> | null = null;
      //位置进行++操作，并且小于positin
      while (index++ < position && current) {
        //记录当前current位置
        previous = current;
        //current跟随index的值，查找下一个元素
        current = current?.next;
      }
      //index === position
      //把插入元素的next元素指向current
      newNode.next = current;
      //前一个元素的next===newNode，这样插入的值就会被在2个值中间被引用
      previous!.next = newNode;
    }
    return true;
  }
  //根据索引移除
  removeAt(position: number) {
    if (position > this.size) return false;
    let current = this.head;
    //1.移除第一个元素时
    if (position === 0) {
      //把head指向下一个元素，这样第一个元素就不会被引用，在GC中会自动被回收
      this.head = current?.next ?? null;
    } else {
      //2.移除其他位置`
      let index = 0;
      let previous: Node<T> | null = null;
      while (index++ < position && current) {
        previous = current;
        current = current.next;
      }
      //前一个next等一后一个的next,相当于中间值就没有被引用，自然被回收
      previous!.next = current?.next ?? null;
    }
    return current?.value;
  }
  //
}

const linkedList = new LinkedList();
linkedList.append("aaa");
linkedList.append("bbb");
linkedList.append("ccc");
linkedList.traverse();
linkedList.insert("ddd", 2);
linkedList.traverse();
linkedList.insert("abc", 0);
linkedList.traverse();
linkedList.removeAt(2);
linkedList.traverse();
console.log(linkedList.removeAt(0));
linkedList.traverse();
export {};
