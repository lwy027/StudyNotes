const mysql = require("mysql2");

//1.创建一个连接(连接上数据库)
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "music_db", //连接数据库
  user: "root",
  password: "Liweiye123456",
});

//2.执行操作语句，操作数据库
//mysql会帮我们连接上数据库，执行这个语句
const statement = "SELECT * FROM `brand`;";
//根据查询语句查询对数据库进行查询
// err:错误信息，values查询的信息，filed：返回信息字段属性
connection.query(statement, (err, values, filed) => {
  if (err) {
    console.log("查询失败", err);
    return;
  }

  //查看结果
  console.log(values);
  console.log(filed);
});
