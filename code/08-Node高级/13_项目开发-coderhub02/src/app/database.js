const connection = require("../service/user.service");

class useService {
  async create(user) {
    //将信息保存在数据库中执行sql语句
    console.log("将用户信息保存在数据库中");
    const { name, password } = user;

    const statement = "INSERT INTO `user` (name, password) VALUES (? , ?);";
    //这里是异步
    const result = await connection.execute(statement, [name, password]);
    console.log(result);
    return result;
  }

  async findUserByName(name) {
    //查询语句
    const statement = "SELECT * FROM `user` WHERE name = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
}

module.exports = new useService();
