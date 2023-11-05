let index = 0;
const obj = {
  [Symbol.iterator]: function () {
    const names = ["jack", "marry", "tom", "jak"];
    return {
      next() {
        if (index < names.length) {
          return { done: false, value: names[index++] };
        } else {
          return { done: true, value: "已经没有元素了" };
        }
      },
    };
  },
};

const fn = obj[Symbol.iterator]();

console.log(fn.next());
console.log(fn.next());
console.log(fn.next());
console.log(fn.next());
console.log(fn.next());
