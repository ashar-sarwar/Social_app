const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.name, { min: 6, max: 23 })) {
    errors.name = `Name b/w 6 and 23`;
  }

  if (validator.isEmpty(data.name)) {
    errors.name = `Name required`;
  }

  if (validator.isEmpty(data.email)) {
    errors.email = `Email required`;
  }

  if (!validator.isEmail(data.email)) {
    errors.password = `Email is invalid`;
  }

  if (!validator.isLength(data.password, { min: 6, max: 23 })) {
    errors.name = `Password must be more than 6 characters`;
  }

  if (validator.isEmpty(data.password)) {
    errors.password = `Password required`;
  }

  



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
