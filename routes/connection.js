var mysql = require("mysql2");

var connection = mysql.createConnection({
    host: "k2fqe1if4c7uowsh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "h51i1f702cnun7lj",
  
    // Your password
    password: "u5vhyq9tggxklqul",
    database: "c4d7ynir29ykrlqs"
  });

  module.exports = connection;


