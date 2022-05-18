import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    try {
      axios
        .post("http://localhost:8000/user/register", data, {
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
