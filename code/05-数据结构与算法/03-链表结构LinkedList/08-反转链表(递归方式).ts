class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  if ((head === null || head!.next) === null) return head;
  //这里可以拿到返回值，因为当head=null时，直接返回当前head
  const newHead = reverseList(head?.next ?? null);
  //这里拿到的是倒数第二个节点,因为，最后一个节点指向null，上面会直接进行返回head,所以这里拿到的是倒数第二个节点
  //我们需要把最后一个节点的next指向当前倒数第二个节点，再把倒数第二个节点的next指向null
  //这样会进行下一次递归操作，下一次递归拿到的head就会是倒数第三个节点，因为倒数第二个节点的next=null了
  //我们再把head的下一个节点指向head,再把head指向null,这样一种递归就可以实现反转操作
  head!.next!.next = head;
  head!.next = null;
  return newHead;
}

const node1 = new ListNode(1);
node1.next = new ListNode(2);
node1.next.next = new ListNode(3);

const newnode = reverseList(node1);
let current = newnode;
while (current) {
  console.log(current.val);
  current = current?.next ?? null;
}

export {};
