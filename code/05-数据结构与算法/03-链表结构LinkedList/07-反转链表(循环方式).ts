class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  if (head === null && head!.next === null) return head;
  // 1.让current节点指向下一个节点
  // ·目的：保留着下一个节点的引用，可以拿到，并且不会销毁
  // 2.改变head当前指向的节点，指向newHead
  // ·对于第一个节点来说，指向newHead就是指向的null
  // 3.让newHead指向head节点
  // ·目的是下一次遍历时，第二步操作，可以让下一个节点指向第一个节点
  // 4.让head移向下一个节点指向current
  let newHead: ListNode | null = null;

  while (head) {
    let current = head.next;
    //第一个节点指向null
    head.next = newHead;
    // ·目的是下一次遍历时，第二步操作，可以让下一个节点指向第一个节点
    newHead = head;
    head = current;
  }

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
