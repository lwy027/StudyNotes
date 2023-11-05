import { measureSort, testSort } from "hy-algokit";

/***
 * 核心思想:
 * 把一个数组分成若干个子数组，
 * 在把相邻的2个子数组进行排序成新的有序数组，
 * 最后把有序数组排序组合成一个整体的有序数组
 */
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  //1.把数组从中间分割成若干个小数组
  const midIndex = Math.floor(arr.length / 2);
  //切割的左数组
  const leftArr = arr.slice(0, midIndex);
  //切割的右数组
  const rightArr = arr.slice(midIndex);
  //1.2把切割后的数组，进行递归操作，直到 切割成一个数组一个元素为止
  const newLeftArr = mergeSort(leftArr);
  const newRightArr = mergeSort(rightArr);

  //2.把若干个小数组进行排序，变成一个有序数组
  //2.1拿到切割后的数组进行排序操作(利用双指针 i, j )
  const newArr: number[] = [];
  //定义双指针，分别指向2个数组的头部
  let i = 0;
  let j = 0;

  //2.2如果左边的数组第一个值小于右边的，那么把左边值push进新数组，否则相反
  while (i < newLeftArr.length && j < newRightArr.length) {
    if (newLeftArr[i] < newRightArr[j]) {
      newArr.push(newLeftArr[i]);
      i++;
    } else {
      newArr.push(newRightArr[j]);
      j++;
    }
  }

  //2.3可能会有左边或右边的值添加不进去的情况，因为 当 i++ 或 j++可能会打断循环
  //左边还有剩余
  if (i < newLeftArr.length) {
    newArr.push(...newLeftArr.slice(i));
  }
  //右边还有剩余情况
  if (j < newRightArr.length) {
    newArr.push(...newRightArr.slice(j));
  }
  return newArr;
}

testSort(mergeSort);
// measureSort(mergeSort);
