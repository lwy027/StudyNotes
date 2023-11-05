// 质数的特点：
//  质数也称为素数。
//  质数表示大于1的自然数中，只能被1和自己整除的数

class hashTable<T = any> {
  //储存数据
  storage: [string, T][][] = [];
  //目前存放的数据
  private count: number = 0;
  //数组的最大长度
  private length: number = 7;

  //判断是否为质数
  private isPrime(num: number) {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }

    return true;
  }

  //扩容/缩容操作
  private resize(newLimit: number) {
    let newPrime = newLimit;
    while (!this.isPrime(newPrime)) {
      newPrime++;
    }
    //1.重置数据
    const oldStorage = this.storage;
    this.length = newPrime;
    this.storage = [];
    this.count = 0;
    //对老数据进行遍历，进行重新添加操作
    oldStorage.forEach((bucket) => {
      if (!bucket) return;
      for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i];
        this.put(tuple[0], tuple[1]);
      }
    });
  }

  //哈希函数，获取index
  private getIndex(str: string, max: number) {
    //1.初始化hashcode
    let hashCode = 0;
    //霍纳计算，计算hashCode的值
    for (let i = 0; i < str.length; i++) {
      hashCode = 31 * hashCode + str.charCodeAt(i);
    }
    //通过取模计算索引值
    let index = hashCode % max;
    return index;
  }

  //put 放入数据和修改数据
  put(key: string, value: T) {
    //1.根据key获取index
    const index = this.getIndex(key, this.length);
    //根据索引获当前位置数据
    let bucket = this.storage[index];

    // 2.第一次bucket可以为undefined，需要创建数组
    if (!bucket) {
      bucket = [];
      this.storage[index] = bucket;
    }

    //3.对bucket里面数据进行遍历，判断key是否重复，如果重复进行修改操作
    //如果bucket里面length为0不会执行
    let isCover = false;
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      if (tupleKey === key) {
        tuple[1] = value;

        isCover = true;
      }
    }
    //4.依然没有覆盖，则进行添加操作
    if (!isCover) {
      bucket.push([key, value]);
      this.count++;
      //数组扩容
      if (this.count / this.length > 0.75) {
        this.resize(this.length * 2);
      }
    }
  }

  //get 获取key 获取数据
  get(key: string): T | undefined {
    //1.根据key获取idnex
    const index = this.getIndex(key, this.length);

    //2.根据idnex获取bucket
    let bucket = this.storage[index];

    //3.进行遍历判断key是否相等
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];

      if (tupleKey === key) {
        return tuple[1];
      }
    }
    return undefined;
  }

  //delete根据key删除
  delete(key: string) {
    const index = this.getIndex(key, this.length);

    const bucket = this.storage[index];
    if (!bucket) return undefined;

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      if (tupleKey === key) {
        bucket.splice(i, 1);
        this.count--;
        //数组缩小容量
        if (this.count / this.length < 0.25 && this.length > 8) {
          this.resize(Math.floor(this.length / 2));
        }

        return tuple[1];
      }
    }
  }
}

const hashtable = new hashTable();

hashtable.put("abc", 111);
hashtable.put("mba", 222);
// hashtable.put("pnm", 3333);
// hashtable.put("lll", 3333);
// hashtable.put("iii", 3333);
// hashtable.put("ppp", 3333);
// // hashtable.put("ccc", 3333);

// console.log(hashtable.storage);
// console.log(hashtable.get("abc"));
// console.log(hashtable.get("pnm"));
// console.log(hashtable.get("ddd"));
// console.log(hashtable.get("ccc"));
// console.log(hashtable.delete("abc"));
// console.log(hashtable.delete("pnm"));
console.log(hashtable.storage);
export {};
