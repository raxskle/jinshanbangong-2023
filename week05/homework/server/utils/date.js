const dayjs = require("dayjs");

const getTime = () => {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
};
module.exports = { getTime };
