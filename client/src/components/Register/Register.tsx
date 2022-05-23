import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { setCredentials } from "store/authSlice";
import { useRegisterMutation } from "services/user";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const [register, { isLoading, isError }] = useRegisterMutation();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const user = await register(data).unwrap();
      dispatch(setCredentials(user));
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  if (isLoading) return <div>Loading</div>;

  if (isError) return <div>Something went wrong</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField label="Username" variant="outlined" required {...field} />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            required
            {...field}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type="password"
            required
            {...field}
          />
        )}
      />
      <Button type="submit" variant="contained" size="large">
        Sign up
      </Button>
    </form>
  );
};

export default Register;
