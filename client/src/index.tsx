import React, { FC } from "react";
import ReactDOM from "react-dom";

import "./main.scss";

const App: FC = () => <h1>My React and TypeScript App!</h1>;

ReactDOM.hydrate(<App />, document.getElementById("root"));
