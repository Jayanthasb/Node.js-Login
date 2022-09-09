module.exports = {
  up: "INSERT INTO accounts (name, email, password, address) VALUES ('Jayantha', 'jayantha@gmail.com','Test@111', 'Galle')",
  down: "delete from accounts order by user_id desc limit 1",
};
