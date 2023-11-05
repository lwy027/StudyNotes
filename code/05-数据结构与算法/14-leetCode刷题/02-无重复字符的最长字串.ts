function lengthOfLongestSubstring(s: string): number {
  //找重复字符串思路
  /**
   * 利用双指针
   * right用来记录遍历，所有字符
   * //left用处：
   * 当right找到重复的字符时，left要移动到前一个重复元素前，
   * 可以使用map保存，字符的key和索引值
   * right-left+1可以获取当前不重复字符的长度
   * 最后用一个变量保存长度取，最长的那一组即可
   */
  const n = s.length;
  //定义需要用到的变量
  //双指针
  let left = 0;
  const map = new Map<string, number>();

  let maxLength = 0;

  for (let right = 0; right < n; right++) {
    //right变量索引字符
    const rightChar = s[right];

    //每一个保存之前都需要判断，在map中是否存在
    if (map.has(rightChar) && left <= map.get(rightChar)!) {
      //移动到前一个重复字符前
      left = map.get(rightChar)! + 1;
    }

    //使用map保存字符的key,和索引
    map.set(rightChar, right);

    //保存长度
    const currLength = right - left + 1;

    maxLength = Math.max(maxLength, currLength);
  }

  return maxLength;
}
const s = "abcabcbb";
console.log(lengthOfLongestSubstring(s));
