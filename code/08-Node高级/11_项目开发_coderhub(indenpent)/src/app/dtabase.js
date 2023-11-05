const connection = require("../service/mysql");
class userService {
  async create(user) {
    const { name, password } = user;
    //2.执行statement语句
    const statement = "INSERT INTO `user` (name, password) VALUES (? , ?);";
    //3.保存2在数据库
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }
  async findUserByName(name) {
    //查询语句
    const statement = "SELECT * FROM `user` WHERE name = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
}

module.exports = new userService();
