import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import MainPage from "pages/MainPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import { setCredentials } from "store/authSlice";
import { useAppDispatch } from "hooks/reduxHooks";
import { useAuthQuery } from "services/user";

const App = () => {
  const { data } = useAuthQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      if (data) {
        dispatch(setCredentials(data));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  });

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default App;
