const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const session = require("express-session");
const popup = require("popups");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "itzme",
  database: "nodelogin",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected");
});

const app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));
//home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});
//signup page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "views/signup.html"));
});

// http://localhost:3000/auth
app.post("/auth", function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          request.session.loggedin = true;
          request.session.username = username;
          // Redirect to home page
          response.redirect("/home");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

// http://localhost:3000/home
app.get("/home", function (request, response) {
  // If the user is loggedin
  if (request.session.loggedin) {
    // Output username
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    // Not logged in
    response.send("Please login to view this page!");
  }
  response.end();
});

app.post("/create_user", (req, res) => {
  //write data to accounts
  var username = req.body.name;
  //res.send(username);
  var password = req.body.pswd;
  var email = req.body.email;
  // res.send(``);
  var sql = `INSERT INTO accounts (username, password, email) VALUES ("${username}", "${password}", "${email}")`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    // popup.alert({
    //   content: `Hello ${username}`,
    // });

    res.sendFile(path.join(__dirname, "views/login.html"));
  });
});

app.listen(5000, () => {
  console.log("Listening on port " + 5000);
});
module.exports = app;
