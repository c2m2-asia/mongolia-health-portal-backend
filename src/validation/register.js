import Validator from 'validator';
import ifEmpty from "./checkforempty";

module.exports = function checkRegistrationFields(data) {
  // An errors object is created
  let errors = {};

  // If data.email is not empty, data.email = data.email
  // else if empty, data.email = ""
  data.email = !ifEmpty(data.email) ? data.email : "";
  data.password = !ifEmpty(data.password) ? data.password : "";
  data.confirmpassword = !ifEmpty(data.confirmpassword) ? data.confirmpassword : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email address is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 8, max: 120 })) {
    errors.password = "Passwords must be greater than 8 characters";
  }
  if (Validator.isEmpty(data.confirmpassword)) {
    errors.confirmpassword = "Confirmation password is required";
  }
  if (!Validator.equals(data.password, data.confirmpassword)) {
    errors.confirmpassword = "Both password fields must match";
  }

  // Return the errors from the checkRegistrationFields function
  // and use the ifEmpty function to check if the errors object is empty
  return {
    errors,
    isValid: ifEmpty(errors)
  };
};
