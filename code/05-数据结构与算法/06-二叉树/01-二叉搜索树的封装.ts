import { btPrint } from "hy-algokit";

class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  parent: TreeNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
  //判断是否是左节点
  get isLeft() {
    return this.parent && this.parent.left === this;
  }
  //判断是否是左节点
  get isRight() {
    return this.parent && this.parent.right === this;
  }
}

export default class BSTree<T = number> {
  private root: TreeNode<T> | null = null;

  //二叉树其他方法
  //遍历树的方法
  print() {
    btPrint(this.root);
  }
  private searchNode(value: T) {
    //1.找到要删除的节点
    let current = this.root;
    //父节点
    let parent: TreeNode<T> | null = null;

    while (current) {
      //判断value是否相等，相等则返回
      if (current?.value === value) {
        return current;
      }
      //记录父节点
      parent = current;
      //向左右节点进行查找
      if (current.value < value) {
        current = current.right;
      } else {
        current = current.left;
      }
      //对parent属性进行赋值
      if (current) current.parent = parent;
    }
    return current;
  }

  //插入非根节点 TreeNode:插入到那个节点  newTreeNode插入节点名称操作
  private insertTreeNode(TreeNode: TreeNode<T>, newTreeNode: TreeNode<T>) {
    //向左子树插入
    if (newTreeNode.value < TreeNode.value) {
      //左子树没有内容直接赋值
      if (TreeNode.left === null) {
        TreeNode.left = newTreeNode;
      } else {
        //如果左子树有内容，我们进行递归操作，传递给左子树的子节点
        this.insertTreeNode(TreeNode.left, newTreeNode);
      }
    } else {
      // 右子树操作
      //如果有子树没有值，添加值
      if (TreeNode.right === null) {
        TreeNode.right = newTreeNode;
      } else {
        //如果有值，进行递归
        this.insertTreeNode(TreeNode.right, newTreeNode);
      }
    }
  }
  //插入 insert
  insert(value: T) {
    //1.常见新节点
    const newTreeNode = new TreeNode(value);

    //2.判断是否有根节点
    if (!this.root) {
      this.root = newTreeNode;
    } else {
      this.insertTreeNode(this.root, newTreeNode);
    }
  }
  //遍历操作
  //前/中/后之间的区别，在于root遍历的位置不一样
  //先序遍历

  preOredertraverse() {
    this.preOredertraverseNode(this.root);
  }
  private preOredertraverseNode(node: TreeNode<T> | null) {
    if (node) {
      console.log(node.value);
      this.preOredertraverseNode(node.left);
      this.preOredertraverseNode(node.right);
    }
  }

  //中序遍历
  inOredertraverse() {
    this.inOredertraverseNode(this.root);
  }
  private inOredertraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.inOredertraverseNode(node.left);
      console.log(node.value);
      this.inOredertraverseNode(node.right);
    }
  }

  //后序遍历
  postOredertraverse() {
    this.postOredertraverseNode(this.root);
  }
  private postOredertraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.postOredertraverseNode(node.left);
      this.postOredertraverseNode(node.right);
      console.log(node.value);
    }
  }

  //层序遍历
  //利用队列结构进行实现
  levelOrderTraverse() {
    //没有根节点之间返回
    if (!this.root) return;

    //创建队列结构，利用先进先出特点
    const queue: TreeNode<T>[] = [];
    queue.push(this.root!);
    //只有队列中有值，进行循环
    while (queue.length !== 0) {
      //拿到第一个元素，返回打印
      const current = queue.shift();
      console.log(current?.value);
      //如果有left，添加进队列中
      if (current?.left !== null) {
        queue.push(current!.left);
      }
      //如果有right，添加进队列中
      if (current?.right !== null) {
        queue.push(current!.right);
      }
    }
  }

  //最大值/最小值，最大值在右边，最小值在左边
  getMinValue() {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current?.value;
  }
  getMaxValue() {
    let current = this.root;
    while (current && current.right) {
      current = current.right;
    }
    return current?.value;
  }

  //search搜索特定的值,返回布尔值
  search(value: T) {
    return !!this.searchNode(value);
  }

  /**
   * 二叉树的删除
   * 三种情况
   *  先找到要删除的节点，如果没有找到，不需要删除
◼ 2> 找到要删除节点
     1) 删除叶子节点
     2) 删除只有一个子节点的节点
     3) 删除有两个子节点的节点 
   * 
   */
  /*
   有获取后继节点
   比current小一点点的节点，称为current节点的前驱。
   比current大一点点的节点，称为current节点的后继
   */
  private getSuccesor(delNode: TreeNode<T>) {
    //后继节点的获取需要往右边找，在往左边找，获取最小值，放在要删除节点的位置
    //获取右子树
    let current = delNode.right;
    //记录后继节点
    let successor: TreeNode<T> | null = null;

    while (current) {
      successor = current;
      current = current.left;
      //给parent赋值
      if (current) {
        current.parent = successor;
      }
    }

    //特殊情况
    if (successor !== delNode.right) {
      successor!.parent!.left = successor!.right ?? null;
      successor!.right = delNode.right;
    }

    //一定要进行的操作，将删除节点的left赋值给后继节点的left
    successor!.left = delNode!.left;

    return successor;
  }

  remove(value: T): boolean {
    let current = this.searchNode(value);

    if (!current) return false;

    //2.获取到三个东西：当前节点/父节点/是属于父节点的左子节点，还是右子节点
    //2.如果删除的是叶子节点
    if (current?.left === null && current.right === null) {
      //如果是叶子节点那么left和right都为null
      //根节点
      if (current === this.root) {
        this.root = null;
      } else if (current!.isLeft) {
        //判断是否为左节点
        current!.parent!.left = null;
      } else {
        //右节点
        current!.parent!.right = null;
      }
    }
    //3.只有一个子节点，并且只有左子节点
    else if (current.right === null) {
      if (current === this.root) {
        this.root = current.left;
      } else if (current.isLeft) {
        current.parent!.left = current.left;
      } else {
        current.parent!.right = current.left;
      }
    }
    //3.只有一个子节点，并且只有右子节点
    else if (current.left === null) {
      if (current === this.root) {
        this.root = current.right;
      } else if (current.isLeft) {
        current.parent!.left = current.right;
      } else {
        current.parent!.right = current.right;
      }
    }

    //4.有二个子节点的情况
    else {
      const successor = this.getSuccesor(current);

      if (current === this.root) {
        this.root = successor;
      } else if (current!.isLeft) {
        current!.parent!.left = successor;
      } else {
        current!.parent!.right = successor;
      }
    }
    return true;
  }
}

const bst = new BSTree();

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

// bst.print();
// bst.preOredertraverse();
// bst.inOredertraverse();
// bst.postOredertraverse();
// bst.levelOrderTraverse();
// console.log(bst.getMaxValue());
// console.log(bst.getMinValue());
// console.log(bst.search(8));
// console.log(bst.search(10));
// console.log(bst.search(13));
// console.log(bst.search(30));

// bst.remove(3);
// bst.remove(10);
// bst.remove(14);
// bst.print();
// bst.remove(13);
// bst.print();
// bst.remove(9);
// bst.print();

bst.remove(20);
// bst.print();

export {};
