import React from "react";
import { Link } from "react-router-dom";

import Login from "components/Login/Login";
import CommonPage from "templates/CommonPage";

const LoginPage = () => {
  return (
    <CommonPage>
      <>
        <Login />
        <p>Don't have an account?</p>
        <Link style={{ color: "blue" }} to="/register">
          Sign up
        </Link>
      </>
    </CommonPage>
  );
};

export default LoginPage;
