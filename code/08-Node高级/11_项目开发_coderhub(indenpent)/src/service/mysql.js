const mysql = require("mysql2");

const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "coderhub",
  user: "root",
  password: "Liweiye123456",
  connectionLimit: 5,
});

//检查是否连接成
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("数据库连接失败", err);
  }

  //和连接池中的一个进行连接
  connection.connect((err) => {
    if (err) {
      console.log("和数据库连接失败", err);
    } else {
      console.log("和数据库连接成功");
    }
  });
});

const connection = connectionPool.promise();

module.exports = connection;
