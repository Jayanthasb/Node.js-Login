module.exports = {
  up: "ALTER table accounts ADD COLUMN address TEXT AFTER password",
  down: "delete from accounts order by user_id desc limit 1",
};
