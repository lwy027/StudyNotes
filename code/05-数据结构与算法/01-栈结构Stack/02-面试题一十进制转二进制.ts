import Stack from "./01-栈结构Stack的封装类";

function decimalToBinary(decimal: number) {
  const stack = new Stack();
  // //如果decimal>0就进入循环
  while (decimal > 0) {
    const result = decimal % 2;
    //push到stack中
    stack.push(result);
    //重新赋值deecimal, 向下取整，最后一次为0
    decimal = Math.floor(decimal / 2);
  }

  let binary = "";
  //如果stack中有值进入循环
  while (!stack.isEmpty()) {
    //进行赋值
    binary += stack.pop();
  }
  return binary;
}

console.log(decimalToBinary(35));
console.log(decimalToBinary(100));
