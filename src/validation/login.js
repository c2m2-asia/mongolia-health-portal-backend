import Validator from "validator";
import ifEmpty from "./checkforempty";

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.username = !ifEmpty(data.username) ? data.username : "";
  data.password = !ifEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: ifEmpty(errors)
  };
};
