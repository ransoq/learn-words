import React, { ReactElement } from "react";

import Header from "components/Header/Header";

const CommonPage = ({ children }: { children: ReactElement }): JSX.Element => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default CommonPage;
