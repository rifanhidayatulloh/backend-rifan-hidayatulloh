const moment = require("moment");

exports.getCurrentDate = () => {
  const result = moment().utcOffset("+0700").format("YYYY-MM-DD HH:mm:ss");
  return result;
};

exports.formatDateID = (date) => {
  const result = moment(date)
    .utcOffset("+0700") // set timeZone Jakarta/Indonesia
    .format("YYYY-MM-DD HH:mm:ss");
  return result;
};
