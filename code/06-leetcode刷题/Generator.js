function* generator(name1) {
  console.log(name1);

  const name2 = yield console.log("我是第二个语句");
  console.log(name2);
  yield console.log("我是第三个语句");
}

const g = generator("第一个");

g.next("第二个");
g.next("第二个");
