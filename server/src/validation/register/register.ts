import Validator from "validator";
import isEmpty from "lodash.isempty";

interface IRegisterError {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  isValid?: boolean;
}

const validateRegisterInput = (data) => {
  const errors: IRegisterError = {};

  if (!isEmpty(data)) {
    const { username, email, password, confirmPassword } = data;

    if (Validator.isEmpty(username)) {
      errors.name = "Username field is required";
    }

    if (Validator.isEmpty(email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(email)) {
      errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(password)) {
      errors.password = "Password field is required";
    }
    if (Validator.isEmpty(confirmPassword)) {
      errors.confirmPassword = "Confirm password field is required";
    }
    if (!Validator.isLength(password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters, but less 30";
    }
    if (!Validator.equals(password, confirmPassword)) {
      errors.confirmPassword = "Passwords don't match";
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateRegisterInput;
