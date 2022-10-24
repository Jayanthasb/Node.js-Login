module.exports = {
  up: "CREATE TABLE accounts (user_id INT AUTO_INCREMENT PRIMARY KEY, username TEXT, email TEXT, password TEXT, login BIT(1))",
  down: "DROP TABLE accounts",
};
