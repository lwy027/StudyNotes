function shellSort(arr: number[]): number[] {
  const n = arr.length;

  // 初始化增量(步长)
  let gap = Math.floor(n / 2);
  while (gap > 0) {
    // 堆每个子序列进行插入排序
    for (let i = gap; i < n; i++) {
      let j = i;
      // 记录第i个位置的数据
      const temp = arr[i];
      // 复制的过程
      while (j > gap - 1 && arr[j - gap] > temp) {
        // 将j - gap位置的数据复制到j为止
        arr[j] = arr[j - gap];
        j -= gap;
      }
      // 将选取位置的元素设置为temp
      arr[j] = temp;
    }

    // 每次循环缩小增量(步长)
    gap = Math.floor(gap / 2);
  }
  return arr;
}

function shellSortHibbard(array: number[]): number[] {
  const n = array.length;

  // 计算 Hibbard 增量序列
  const increments = [1];
  let k = 1;
  while (increments[k - 1] < n) {
    increments.push(2 ** k - 1);
    k++;
  }

  // 对每个增量进行希尔排序
  for (let i = increments.length - 1; i >= 0; i--) {
    const increment = increments[i];

    // 对每个子序列进行插入排序
    for (let j = increment; j < n; j++) {
      const temp = array[j];
      let k = j;
      while (k >= increment && array[k - increment] > temp) {
        array[k] = array[k - increment];
        k -= increment;
      }
      array[k] = temp;
    }
  }

  return array;
}

// testSort(shellSortSedgewick)
// measureSort(shellSort)
