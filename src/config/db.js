const mysql2 = require('mysql2');
require('dotenv').config();

var database = mysql2.createConnection({
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD
});

database.connect(err => {
    if (err)
        throw err;
    console.log("Connected to database!")
})

module.exports = database;