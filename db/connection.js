const mysql = require("mysql2")

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // {TODO: Add your MySQL password}
    password: '',
    database: 'store_db'
  },
  console.log(`Connected to the store_db.`)
).promise();

module.exports = db