import React, { FC } from "react";

import Header from "components/Header";
import Login from "components/Login";

const MainPage: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Login />
      </main>
    </>
  );
};

export default MainPage;
