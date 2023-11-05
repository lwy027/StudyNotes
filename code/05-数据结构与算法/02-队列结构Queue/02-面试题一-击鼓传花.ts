import Queue from "./01-队列结构的封装类";

function hotPotato(names: string[], num: number) {
  //1.创建队列
  const queue = new Queue();
  //2.把names加入队列
  for (const name of names) {
    queue.enqueue(name);
  }
  //3.只有一个人赢得比赛
  while (queue.size() > 1) {
    //4.游戏规则是，对于喊到num数字的人淘汰，
    /*所以我们把<num数字的人移除之后在加入队列，这样<num的人就会重新排列在队列的最后面，
  我们只需要删除第一个即可，第一个就是喊到对应数字的人
  */
    for (let i = 1; i < num; i++) {
      //移出在加入队列
      const name = queue.dequeue();
      queue.enqueue(name);
    }
    //5.删除第一个
    queue.dequeue();
  }

  return queue.dequeue();
}

const name = hotPotato(["lwy", "james", "jake", "curry", "aaa"], 3);
console.log(name);
