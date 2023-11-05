const mysql = require("mysql2");

//1.创建连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "coderhub",
  user: "root",
  password: "Liweiye123456",
  connectionLimit: 5,
});

//2.判断连接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("数据库连接失败", err);
    return;
  }

  //connect是和连接池连接的一个连接
  connection.connect((err) => {
    if (err) {
      console.log("和数据库交互失败", err);
    } else {
      console.log("和数据库连接成功");
    }
  });
});

const connection = connectionPool.promise();

module.exports = connection;
