import React from "react";
import { Link as LinkTo } from "react-router-dom";
import Link from "@mui/material/Link";

import Login from "components/Login/Login";
import CommonPage from "templates/CommonPage";

const LoginPage = () => {
  return (
    <CommonPage>
      <>
        <Login />
        <p>Don't have an account?</p>
        <LinkTo to="/register">
          <Link underline="none">Sign up</Link>
        </LinkTo>
      </>
    </CommonPage>
  );
};

export default LoginPage;
