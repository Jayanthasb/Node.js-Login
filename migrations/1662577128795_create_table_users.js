module.exports = {
  up: "INSERT INTO accounts (username, email, password, is_logged) VALUES ('Jayantha', 'jayantha@gmail.com','Test@111', 0)",
  down: "delete from accounts order by user_id desc limit 1",
};
