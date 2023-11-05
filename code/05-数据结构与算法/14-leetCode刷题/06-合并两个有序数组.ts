/*
 * @Author: liweiye 2759536538@qq.com
 * @Date: 2023-08-14 07:37:35
 * @LastEditors: liweiye 2759536538@qq.com
 * @LastEditTime: 2023-08-14 08:20:44
 * @FilePath: \05-数据结构与算法\14-leetCode刷题\06-合并两个有序数组.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function merge(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): number[] {
  const newNum1 = nums1.filter((item) => {
    return item !== 0;
  });
  const newNum2 = nums2.filter((item) => {
    return item !== 0;
  });

  //进行排序操作
  nums1 = [...newNum1, ...newNum2];

  const n2: number = nums1.length;

  for (let j = 0; j < n2; j++) {
    for (let k = 0; k < n2 - 1 - j; k++) {
      if (nums1[k] > nums1[k + 1]) {
        const temp = nums1[k];
        nums1[k] = nums1[k + 1];
        nums1[k + 1] = temp;
      }
    }
  }

  return nums1;
}

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));
// merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 0, 0, 6, 0], 3);
