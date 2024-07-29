const { HTTPStatusCode } = require("../utils/constant");

const errorHandling = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);

  // handling sequelize validaton error
  let validationErrorItem = [];
  if (err.errors && err.errors.length > 0) {
    const errors = err.errors;
    errors.map((val) => {
      validationErrorItem.push({
        item: val.path,
        message: val.message,
      });
    });
  }

  const error = {
    status: HTTPStatusCode[`${err.status ? err.status : 500}`],
    code: err.status || 500,
    message: validationErrorItem.length > 0 ? "Validation error" : err.message,
  };

  if (validationErrorItem.length > 0) error.validationErrorItem = validationErrorItem;

  console.log(error);

  res.json({
    error,
  });
};

module.exports = errorHandling;
