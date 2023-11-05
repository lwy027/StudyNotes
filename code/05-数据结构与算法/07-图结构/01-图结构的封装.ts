class Graph<T> {
  /**
   * vertexes： 用于存储所有的顶点,我们说过使用一个数组来保存。
✓ adjList： adj是adjoin的缩写,邻接的意思。 adjList用于存储所有的边,我们这里采用邻接表的形式
   */
  vertexes: T[] = [];
  adjList: Map<T, T[]> = new Map();

  //添加顶点
  addVertex(V: T) {
    this.vertexes.push(V);
    this.adjList.set(V, []);
  }
  //添加边
  addEdge(v1: T, v2: T) {
    this.adjList.get(v1)?.push(v2);
    this.adjList.get(v2)?.push(v1);
  }

  //打印
  traverse() {
    this.vertexes.forEach((vertex) => {
      const adjList = this.adjList.get(vertex);
      console.log(`${vertex}-> ${adjList?.join(" ")}`);
    });
  }

  //图的遍历
  //bfs广度优先
  /*
 广度优先算法会从指定的第一个顶点开始遍历图，先访问其所有的相邻点，就像一次访问图的一层。
 换句话说，就是先宽后深的访问顶点，类似树结构的层序遍历
*/
  bfs() {
    //1.判断vertex中是否有值
    if (this.vertexes.length === 0) return;

    //2.创建队列结构，利用先进先出的特性，一层一层进行遍历
    const queue: T[] = [];
    queue.push(this.vertexes[0]);

    //3.利用set判断当前节点是否遍历过
    const visted = new Set();
    visted.add(this.vertexes[0]);

    //4.进行遍历
    while (queue.length) {
      //取第一个
      const vertex = queue.shift()!;
      console.log(vertex);
      //拿到边
      const neighbors = this.adjList.get(vertex);
      if (!neighbors) continue;
      for (const nei of neighbors) {
        if (!visted.has(nei)) {
          visted.add(nei);

          queue.push(nei);
        }
      }
    }
  }

  /*  
    深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径知道这条路径最后被访问了。
   接着原路回退并探索下一条路径。
  广度优先搜索算法我们使用的是队列，这里可以使用栈
   完成，也可以使用递归
  **/
  dfs() {
    const stack: T[] = [];
    stack.push(this.vertexes[0]);

    const visted = new Set();
    visted.add(this.vertexes[0]);

    while (stack.length) {
      const vertex = stack.pop()!;
      console.log(vertex);

      const neighbors = this.adjList.get(vertex);
      if (!neighbors) continue;
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const nei = neighbors[i];

        if (!visted.has(nei)) {
          visted.add(nei);
          stack.push(nei);
        }
      }
    }
  }
}

const graph = new Graph();

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
graph.addVertex("H");
graph.addVertex("I");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

// graph.traverse();
// graph.bfs();
graph.dfs();
