module.exports = {
  up: "INSERT INTO accounts (name, email, password, address) VALUES ('Dayananda','dayananda@gmail.com', 'Test@111', 'Kegalle')",
  //   down: "UPDATE test SET name = '' WHERE name = 'John Snow4'",
  down: "delete from accounts order by user_id desc limit 1",
};
