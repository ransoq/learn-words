import Validator from 'validator';
import isEmpty from 'is-empty';

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

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLoginInput;