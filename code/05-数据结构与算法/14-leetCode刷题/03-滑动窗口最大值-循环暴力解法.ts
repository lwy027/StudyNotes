/*
 * @Author: liweiye 2759536538@qq.com
 * @Date: 2023-08-06 16:53:26
 * @LastEditors: liweiye 2759536538@qq.com
 * @LastEditTime: 2023-08-07 18:25:34
 * @FilePath: \05-数据结构与算法\14-leetCode刷题\03-滑动窗口最大值-循环暴力解法.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
  let maxNum: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (k > nums.length) break;
    const newnum: number[] = nums.slice(i, k);
    k++;

    maxNum.push(Math.max(...newnum));
  }
  console.log(maxNum);
  return maxNum;
}
//性能不佳

const nums = [1, 3, -1, -3, 5, 3, 6, 7];
maxSlidingWindow(nums, 3);

export {}
