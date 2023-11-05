const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "music_db", //连接数据库
  user: "root",
  password: "Liweiye123456",
});

//1. 预处理语句，使用 ? 相当于占位，mysql会把预处理语句进行储存，只要在使用传值时，才会执行
//提高性能，防止sql注入安全问题
const statement = "SELECT * FROM `products` WHERE price > ? AND score > ? ;";

//2. 执行一个SQL语句：预处理语句，使用execute
//第二个参数，是要传入的条件
connection.execute(statement, [5000, 8], (err, values, filed) => {
  console.log(values);
  console.log(filed);
});
