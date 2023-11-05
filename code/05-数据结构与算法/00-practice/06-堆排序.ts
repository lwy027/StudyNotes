import { swap, testSort } from "hy-algokit";

function heapSort(arr: number[]): number[] {
  const n = arr.length;

  //回去非叶子节点
  let start = Math.floor(n / 2 - 1);

  for (let i = start; i >= 0; i--) {
    heapDown(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    swap(arr, 0, i);
    heapDown(arr, i, 0);
  }

  //原地建堆

  return arr;
}

function heapDown(arr: number[], n: number, index: number) {
  while (2 * index + 1 < n) {
    //非叶子的左右节点
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;
    let larageIndex = leftChildIndex;

    if (arr[rightChildIndex] > arr[leftChildIndex] && rightChildIndex < n) {
      larageIndex = rightChildIndex;
    }

    if (arr[index] > arr[larageIndex]) {
      break;
    }
    swap(arr, index, larageIndex);

    index = larageIndex;
  }
}

testSort(heapSort);
