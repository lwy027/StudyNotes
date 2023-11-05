import BSTree from "./00-二叉搜索树的封装";
export default class AVLTreeNode<T> extends BSTree<T> {
  left: AVLTreeNode<T> | null = null;
  right: AVLTreeNode<T> | null = null;
  parent: AVLTreeNode<T> | null = null;
  //记录树的高度
  height: number = 1;

  //获取树的高度
  private getHeight(): number {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  //根据树的高度计算树的平衡因子，left-right 值只能是 -1, 0 , 1
  //如果是其他值，就要进行旋转操作
  public getBalanceFactor() {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;
    return leftHeight - rightHeight;
  }
  //判断当前是否平衡
  public get isBalance(): boolean {
    const balanceFactor = this.getBalanceFactor();

    return balanceFactor <= 1 && balanceFactor >= -1;
  }

  //获取更高的子节点,决定，树怎么旋转，可以判断是左边不平衡还是右边不平衡
  public get heigherChild(): AVLTreeNode<T> | null {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;
    if (leftHeight > rightHeight) return this.left;
    if (leftHeight < rightHeight) return this.right;
    //高度一样返回同方向节点
    return this.left ? this.left : this.right;
  }

  //右旋转的操作
  rightRotation() {
    const isLeft = this.isLeft;
    const isRight = this.isRight;

    //1.选择当前节点的轴心,进行操作,这里的this是root
    const pivot = this.left!;
    pivot.parent = this.parent;

    //2.对轴心的右子节点进行操作,让它放在root上
    this.left = pivot.right;
    if (pivot.left) {
      pivot.left.parent = this;
    }

    //3.把pivot设置为root的父节点
    pivot.right = this;
    this.parent = pivot;

    //4.判断是否右父节点
    if (!pivot.parent) {
      //pivot为根节点情况
      return pivot;
    } else if (isLeft) {
      // pivot为根节点的左节点情况
      pivot.parent.left = pivot;
    } else if (isRight) {
      // pivot为根节点的右节点情况
      pivot.parent.right = pivot;
    }

    return pivot;
  }
  //左旋转操作
  leftRotation() {
    const isLeft = this.isLeft;
    const isRight = this.isRight;
    //1.获取轴心
    const pivot = this.right!;
    pivot.parent = this.parent;

    //2.对轴心上的节点进行操作，放在this上
    this.right = pivot.left;
    if (pivot.left) {
      pivot.parent = this;
    }

    //3.把pivot设置为this父节点
    pivot.left = this;
    this.parent = pivot;

    //4.判断是否右父节点
    if (!pivot.parent) {
      //pivot为根节点情况
      return pivot;
    } else if (isLeft) {
      // pivot为根节点的左节点情况
      pivot.parent.left = pivot;
    } else if (isRight) {
      // pivot为根节点的右节点情况
      pivot.parent.right = pivot;
    }

    return pivot;
  }
}

// const AVLTree = new AVLTreeNode(10);
// AVLTree.right = new AVLTreeNode(15);
// AVLTree.right.right = new AVLTreeNode(20);

// console.log(AVLTree.right.isBalance);
// console.log(AVLTree.heigherChild);

// AVLTree.insert(10);
// AVLTree.insert(15);
// AVLTree.insert(20);

// AVLTree.print();
