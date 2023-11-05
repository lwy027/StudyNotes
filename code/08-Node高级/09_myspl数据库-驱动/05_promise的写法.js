const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "music_db", //连接数据库
  user: "root",
  password: "Liweiye123456",
  connectionLimit: 5, //限制最大的连接数
});

const statement = "SELECT * FROM `products` WHERE price > ? AND score > ? ;";

pool
  .promise()
  .execute(statement, [5000, 8])
  .then((res) => {
    //res中的数据为数组,可以进行解构
    const [values, files] = res;
    console.log(values);
    console.log(files);
  });
