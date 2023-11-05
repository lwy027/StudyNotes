import { testSort } from "hy-algokit";

function swap(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const newNums: number[] = [...nums1, ...nums2];
  partitin(0, newNums.length - 1);
  function partitin(left: number, right: number) {
    if (left >= right) return;

    let pivot = newNums[right];
    let i = left;
    let j = right - 1;
    while (i <= j) {
      while (newNums[i] < pivot) {
        i++;
      }
      while (newNums[j] > pivot) {
        j--;
      }

      if (i <= j) {
        swap(newNums, i, j);
        i++;
        j--;
      }
    }
    swap(newNums, i, right);
    partitin(left, j);
    partitin(i, right);
  }

  console.log(newNums);
  if (newNums.length % 2 === 0) {
    const mid = Math.floor(newNums.length / 2);
    const midNum = (newNums[mid] + newNums[mid - 1]) / 2;
    return midNum;
  } else {
    const mid = Math.floor(newNums.length / 2);
    const midNum = newNums[mid];
    return midNum;
  }
}

console.log(findMedianSortedArrays([1, 3, 2], [6, 4, 5, 7]));
export {};
