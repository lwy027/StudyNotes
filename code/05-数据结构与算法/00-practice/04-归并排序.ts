import { testSort } from "hy-algokit";

function mergeSort(arr: number[]): number[] {
  if (arr.length === 1) return arr;
  const n = arr.length;

  const mid = Math.floor(n / 2);

  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);

  const newLeftArr = mergeSort(leftArr);
  const newRightArr = mergeSort(rightArr);

  //进行合并操作
  const newArr: number[] = [];

  let i = 0;
  let j = 0;

  while (i < newLeftArr.length && j < newRightArr.length) {
    if (newLeftArr[i] < newRightArr[j]) {
      newArr.push(newLeftArr[i]);
      i++;
    } else {
      newArr.push(newRightArr[j]);
      j++;
    }
  }

  if (i < newLeftArr.length) {
    newArr.push(...newLeftArr.slice(i));
  }
  if (j < newRightArr.length) {
    newArr.push(...newRightArr.slice(j));
  }

  return newArr;
}

testSort(mergeSort);
