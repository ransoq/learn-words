import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

interface IFormInput {
  name: string;
  password: string;
}

const Login = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    try {
      const response = axios.post("https://localhost:8000/login", data);
    } catch (error: any) {
      throw new Error(error);
    }
    console.log(data, "data");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField label="Name" variant="outlined" required {...field} />
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
      <Button type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
};

export default Login;
