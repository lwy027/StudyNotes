const mysql = require("mysql2/promise");
(async function () {
  const connection = await mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Liweiye123456",
    database: "practice",
    connectionLimit: 10,
  });

  const statement = "select * from customers";
  const [results, filed] = await connection.query(statement);

  console.log(results);
})();
