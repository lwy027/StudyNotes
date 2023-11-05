function sequence<T>(arr: number[], num: number) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) {
      return i;
    }
  }
  return -1;
}

const result = sequence([1, 2, 3, 55, 99, 111, 222, 333, 444, 555], 99);

console.log(result);

export {};
