import Stack from "./01-栈结构Stack的封装类";

function isValid(s: string): boolean {
  const stack = new Stack();
  //对字符串进行遍历
  for (let i = 0; i < s.length; i++) {
    //记录拿到的值
    const c = s[i];
    //如果为左边的
    if (c === "(") {
      //我们把对应的右边push保存
      stack.push(")");
    } else if (c === "{") {
      stack.push("}");
    } else if (c === "[") {
      stack.push("]");
    } else {
      //如果为右边的，利用栈后进先出的特性，进行判断是否与做后push的值匹配
      //不匹配返回false
      if (c !== stack.pop()) return false;
    }
  }
  //如果右边的括号全部匹配，说明为为有效的，并且stack中全部移除了，返回true
  return stack.isEmpty();
}

console.log(isValid("{}()[]"));
console.log(isValid("{(})"));
console.log(isValid("([]{})"));
