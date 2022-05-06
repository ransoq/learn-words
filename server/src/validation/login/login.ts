import Validator from "validator";
import isEmpty from "lodash.isempty";

interface ILoginError {
  email?: string;
  password?: string;
}

interface ILoginData {
  email: string;
  password: string;
}

const validateLoginInput = (data: ILoginData) => {
  const errors: ILoginError = {};

  const { email, password } = data;

  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLoginInput;
