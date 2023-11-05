function maxSlidingWindow(nums, k) {
  var n = nums.length;
  //创建双端队列：保存最大值的索引
  var dequeue = [];
  var res = [];
  for (var i = 0; i < n; i++) {
    //如果nums的后一项大于队列最后一项，则删除队列最后一项保存下表
    while (dequeue.length && nums[i] > nums[dequeue[dequeue.length - 1]]) {
      dequeue.pop();
    }
    //否则添加
    dequeue.push(i);
    console.log(dequeue);
    //检查目前队列头部的索引是否在范围之内，有越界行为
    while (dequeue[0] <= i - k) {
      dequeue.shift();
    }
    //没有越界，获取头部的值保存最大值

    debugger;
    if (i >= k - 1) {
      var max = nums[dequeue[0]];
      // console.log(max);
      res.push(max);
    }
  }
  return res;
}
var nums = [1, 3, -1, -3, 5, 3, 6, 7];
console.log(maxSlidingWindow(nums, 3));
