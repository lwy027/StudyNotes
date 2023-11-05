/*
 * @Author: liweiye 2759536538@qq.com
 * @Date: 2023-07-31 11:03:41
 * @LastEditors: liweiye 2759536538@qq.com
 * @LastEditTime: 2023-08-01 09:21:34
 * @FilePath: \05-数据结构与算法\11-平衡树\02-AVLTree的实现.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { TreeNode } from "./00-二叉搜索树的封装";
import BSTree from "./00-二叉搜索树的封装";
import AVLTreeNode from "./01-AVlTreeNode的封装";

class AVLTree<T> extends BSTree<T> {
  //重现父类的方法
  protected creatNode(value: T): TreeNode<T> {
    return new AVLTreeNode(value);
  }

  //如何获取不平衡的节点
  //重新父类方法
  protected checkBalance(node: AVLTreeNode<T>): void {
    let current = node.parent;
    while (current) {
      if (!current.isBalance) {
        this.rebalance(current);
      }
      current = current.parent;
    }
  }
  //获取不平衡的节点，进行平衡操作
  rebalance(root: AVLTreeNode<T>) {
    //获取当前传入node最高的节点，也就是轴心，用来对轴心后的节点进行旋转
    const pivot = root.heigherChild!;
    //轴心的子节点，用于判断是左节点还是右节点
    const current = pivot?.heigherChild;
    let resultNode: AVLTreeNode<T> | null = null;
    if (pivot.isLeft) {
      //L
      if (current?.isLeft) {
        //LL: left left
        //左左情况，直接进行右旋转
        resultNode = root.rightRotation();
      } else {
        //LR : left Right
        //左右情况，先对轴心进行左旋转，在对root整体进行右旋转
        pivot.leftRotation();
        resultNode = root.rightRotation();
      }
    } else {
      //R
      if (current?.isLeft) {
        //RL: right left
        //右左情况，先对轴心进行右旋转，在对root整体进行左旋转
        pivot?.rightRotation();
        resultNode = root.leftRotation();
      } else {
        //RR: right right
        //右右情况进行右旋转
        resultNode = root.rightRotation();
      }
    }
    if (!resultNode.parent) {
      this.root = resultNode;
    }
  }
}

const avlT = new AVLTree(10);
avlT.insert(20);
avlT.insert(15);
avlT.insert(16);
avlT.insert(30);
avlT.insert(135);
avlT.insert(100);
avlT.insert(120);

avlT.print();
