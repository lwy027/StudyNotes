function feib(n: number): number {
  if (n <= 1) return n;
  return feib(n - 1) + feib(n - 2);
}
console.log(feib(20));
console.log(feib(30));
// console.log(feib(40));
// console.log(feib(50));
export {};
