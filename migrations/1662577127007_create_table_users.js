module.exports = {
  up: "ALTER table accounts ADD COLUMN is_logged BIT(1) AFTER password",
  down: "delete from accounts order by user_id desc limit 1",
};
