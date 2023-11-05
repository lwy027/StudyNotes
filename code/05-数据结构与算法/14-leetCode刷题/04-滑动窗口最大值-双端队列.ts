/*
 * @Author: liweiye 2759536538@qq.com
 * @Date: 2023-08-07 18:25:25
 * @LastEditors: liweiye 2759536538@qq.com
 * @LastEditTime: 2023-08-07 18:44:12
 * @FilePath: \05-数据结构与算法\14-leetCode刷题\04-滑动窗口最大值-双端队列.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
  const n = nums.length;
  //创建双端队列：保存最大值的索引
  const dequeue: number[] = [];

  const res: number[] = [];
  for (let i = 0; i < n; i++) {
    //如果nums的后一项大于队列最后一项，则删除队列最后一项保存下表
    while (dequeue.length && nums[i] > nums[dequeue[dequeue.length - 1]]) {
      dequeue.pop();
    }
    //否则添加
    dequeue.push(i);
 
    //检查目前队列头部的索引是否在范围之内，有越界行为
    while (dequeue[0] <= i - k) {
      dequeue.shift();
    }
    //没有越界，获取头部的值保存最大值
    if (i >= k - 1) {
      const max = nums[dequeue[0]];
      // console.log(max);
      res.push(max);
    }
  }
  return res;
}

const nums = [1, 3, -1, -3, 5, 3, 6, 7];
console.log(maxSlidingWindow(nums, 3));

export {};
