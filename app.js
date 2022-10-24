const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const session = require("express-session");

const hostname = "127.0.0.1"; // you have to replace this if restrat the mechine
const port = 5000;
let session_id;
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
//logout
app.get("/logout", (req, res) => {
  console.log("logout request recieved");
  // res.sendFile(path.join(__dirname, "views/login.html"));

  if (session_id != null) {
    console.log("logging out");
    connection.query(
      "UPDATE accounts SET login = 0 WHERE user_id = ?",
      [session_id],
      function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log("logout updated");
      }
    );
  }
  res.redirect("/");
});

app.get("/online", (req, res) => {
  console.log("fetch recieved");
  connection.query(
    "SELECT * FROM accounts WHERE login = ?",
    [1],
    function (error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        //request.session.loggedin = true;

        console.log(">> results: ", results);
        var string = JSON.stringify(results);
        console.log(">> string: ", string);
        var json = JSON.parse(string);
        console.log(">> json: ", json);
        //session_id = json[0].user_id;
        console.log(">> user_id: ", session_id);
        //req.list = json;
        res.json(results);
      }
    }
  );
});

// http://localhost:5000/auth
app.post("/auth", function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query(
      "SELECT user_id FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          request.session.loggedin = true;

          request.session.username = username;
          console.log(">> results: ", results);
          var string = JSON.stringify(results);
          console.log(">> string: ", string);
          var json = JSON.parse(string);
          console.log(">> json: ", json);
          session_id = json[0].user_id;
          console.log(">> user_id: ", session_id);
          //req.list = json;
          if (session_id != null) {
            console.log("inside");
            connection.query(
              "UPDATE accounts SET login = 1 WHERE user_id = ?",
              [session_id],
              function (err, result) {
                if (err) {
                  console.log(err);
                }
                console.log("login updated");
              }
            );
          }

          //Redirect to home page
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
    response.sendFile(path.join(__dirname, "views/dashboard.html"));
  }

  //   // Output username
  //   response.send("Welcome back, " + request.session.username + "!");
  // } else {
  //   // Not logged in
  //   response.send("Please login to view this page!");
  // }
  // response.end();
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

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
module.exports = app;
