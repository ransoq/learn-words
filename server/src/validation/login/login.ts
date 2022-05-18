import Validator from "validator";
import isEmpty from "lodash.isempty";

interface ILoginError {
  email?: string;
  password?: string;
  isValid?: boolean;
}

interface ILoginData {
  email: string;
  password: string;
}

const validateLoginInput = (data: ILoginData) => {
  const errors: ILoginError = {};

  if (!isEmpty(data)) {
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
  }
  return {
    email: "Empty field",
    password: "Empty field",
    isValid: false,
  };
};

export default validateLoginInput;
