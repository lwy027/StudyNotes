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

  const data: ListNode[] = [];

  let current = head;
  while (current) {
    data.push(current);
    current = current.next;
  }

  const newData: ListNode | null = data.pop()!;
  let currentNewData = newData;
  while (data.length) {
    //删除最后一个元素，并且添加到最前面
    const node = data.pop()!;
    currentNewData.next = node;
    currentNewData = currentNewData.next;
  }
  currentNewData.next = null;
  return newData;
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
