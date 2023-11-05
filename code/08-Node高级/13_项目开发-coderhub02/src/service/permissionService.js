const connection = require("./user.service");

class PermissionService {
  async checkResoure(resourceId, resourceName, id) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`;
    const [res] = await connection.execute(statement, [resourceId, id]);
    return !!res.length;
  }
}

module.exports = new PermissionService();
