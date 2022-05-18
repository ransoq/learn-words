import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("TEST");
    try {
      axios
        .post("http://localhost:8000/user/login", data, {
          withCredentials: true,
        })
        .then((res) => console.log(res, "response"));
    } catch (error: any) {
      throw new Error(error);
    }
  };

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
