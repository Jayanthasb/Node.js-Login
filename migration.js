// migration.js
var mysql = require("mysql");
var migration = require("mysql-migrations");

var connection = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "itzme",
  database: "nodelogin",
});

// migration.init(connection, __dirname + "/home/jayantha/projects/migrations");

migration.init(
  connection,
  "/home/jayantha/projects/basic-html-form/public_html/migrations",
  function () {},
  ["--update-schema"]
);
