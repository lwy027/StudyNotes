import { testSort } from "hy-algokit";

function insertionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    //未排好序元素
    let newnum = arr[i];
    //为排好序前面元素
    let j = i - 1;

    while (arr[j] > newnum && j >= 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = newnum;
  }

  return arr;
}
testSort(insertionSort);
