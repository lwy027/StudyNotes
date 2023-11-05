/*
 * @Author: liweiye 2759536538@qq.com
 * @Date: 2023-07-28 08:44:29
 * @LastEditors: liweiye 2759536538@qq.com
 * @LastEditTime: 2023-07-28 09:15:07
 * @FilePath: \06-leetcode刷题\01-两数之和.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function twoSum(nums: number[], target: number): number[] {
  //1.储存值
  const newNums: number[] = [];

  if (nums.length > 1) {
    let map: Map<number, any> = new Map();

    nums.forEach((n, i) => {
      let diff = target - n;

      if (map.has(diff)) {
        newNums.push(map.get(diff), i);
        console.log(map.get(diff), i);
      }
      map.set(n, i);
    });
  }
  return newNums;
}
twoSum([2, 7, 11, 15], 9);
