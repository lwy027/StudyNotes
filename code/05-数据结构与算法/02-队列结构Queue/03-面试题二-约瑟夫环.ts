function lastRemaining(n: number, m: number): number {
  const data: number[] = [];
  for (let i = 0; i < n; i++) {
    data.push(i);
  }

  while (data.length > 1) {
    for (let i = 1; i < m; i++) {
      const num = data.shift()!;
      data.push(num);
    }

    data.shift();
  }

  return data.shift()!;
}
lastRemaining(5, 3);
lastRemaining(10, 17);
