import Validator from "validator";
import isEmpty from "is-empty";

interface IRegisterError {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface IRegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validateRegisterInput = (data: IRegisterData) => {
  const errors: IRegisterError = {};

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters, but less 30";
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords don't match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateRegisterInput;
