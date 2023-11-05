const connection = require("./user.service");

class contentService {
  async create(content, userId) {
    const statement = "INSERT INTO content (content, user_id) VALUES (?, ?);";
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  async getQueryList(offset, size) {
    const statement = `SELECT c.content c, c.id id, c.createAt createTime, c.updataAt updataTime, JSON_OBJECT( 'id', u.id , 'name', u.name) user FROM content c LEFT JOIN user u ON u.id = c.user_id GROUP BY c.id LIMIT ?, ?;`;

    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }
  async getListById(Id) {
    const statement = `SELECT  
    c.content c, c.id id, c.createAt createTime, c.updataAt updataTime, JSON_OBJECT( 'id', u.id , 'name', u.name) user
   FROM content c LEFT JOIN user u ON u.id = c.user_id WHERE c.id = ?;`;

    const [result] = await connection.execute(statement, [Id]);
    return result[0];
  }
  //根据id更改数据库
  async updataById(content, id) {
    const statement = "UPDATE content SET content = ? WHERE id = ?;";
    const [res] = await connection.execute(statement, [content, id]);
    return res;
  }
  //根据id删除数据库
  async deleteById(id) {
    const statement = "DELETE FROM content WHERE id = ?;";
    const [res] = await connection.execute(statement, [id]);
    return res;
  }
}

module.exports = new contentService();
