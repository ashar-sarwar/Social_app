const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    errors.email = `Email required`;
  }

  if (!validator.isEmail(data.email)) {
    errors.password = `Email is invalid`;
  }

  if (validator.isEmpty(data.password)) {
    errors.password = `Password required`;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};