module.exports = {
  up: "CREATE TABLE accounts (user_id INT AUTO_INCREMENT PRIMARY KEY, name TEXT, email TEXT, password TEXT )",
  down: "DROP TABLE accounts",
};
