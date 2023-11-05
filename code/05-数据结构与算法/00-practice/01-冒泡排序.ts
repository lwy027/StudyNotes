import { swap, testSort } from "hy-algokit";

function bubbleSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j + 1] < arr[j]) {
        swap(arr, j + 1, j);
      }
    }
  }

  return arr;
}

testSort(bubbleSort);
