function feib(n: number): number {
  if (n <= 1) return n;
  let f0 = 0;
  let f1 = 1;

  for (let i = 2; i <= n; i++) {
    let f2 = f0 + f1;
    f0 = f1;
    f1 = f2;
  }
  return f1;
}
console.log(feib(10));
console.log(feib(50));
export {};
