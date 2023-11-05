const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Liweiye123456",
  database: "music_db", //连接数据库
});
const statement = `INSERT INTO products SET ?;`;
const phoneJson = require("./phone.json");
for (let phone of phoneJson) {
  connection.query(statement, phone);
}
