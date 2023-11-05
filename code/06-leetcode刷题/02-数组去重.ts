function removeDuplicates(nums: number[]): number {
  let newArr: number[] = [];
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if (newArr.includes(nums[i])) {
      continue;
    }
    newArr.push(nums[i]);
  }
  console.log(newArr);
  return newArr.length;
}

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
