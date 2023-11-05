const mysql = require("mysql2");

const mysql2 = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "music_db", //连接数据库
  user: "root",
  password: "Liweiye123456",
  connectionLimit: 5, //限制最大的连接数
});
