import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "services/user";
import { setCredentials } from "store/authSlice";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const [login, { isLoading, isError }] = useLoginMutation();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const user = await login(data).unwrap();
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
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField label="Email" variant="outlined" required {...field} />
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
            margin="normal"
            type="password"
            required
            {...field}
          />
        )}
      />
      <Button type="submit" variant="contained" size="large">
        Login
      </Button>
    </form>
  );
};

export default Login;
