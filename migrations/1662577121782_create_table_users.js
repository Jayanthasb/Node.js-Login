module.exports = {
  up: "INSERT INTO accounts ( username, email, password) VALUES ('test','test@gmail.com', 'Test@111')",
  down: "delete from accounts order by user_id desc limit 1",
};
