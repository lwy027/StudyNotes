import { swap, testSort } from "hy-algokit";

function selectionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    swap(arr, i, minIndex);
  }

  return arr;
}

testSort(selectionSort);
