type testSortType = (arr: number[]) => number[];
//交换函数
export function swap(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

//测试排序函数
export function testSort(fn: testSortType) {
  const arr = Array.from({ length: 10 }, () => {
    return Math.floor(Math.random() * 200);
  });
  console.log("排序前的数组", arr);
  fn(arr);
  console.log("排序后的数组", arr);
  console.log("是否正确进行排序", isSort(arr));
}
//判断是否正确进行排序函数
export function isSort(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}
