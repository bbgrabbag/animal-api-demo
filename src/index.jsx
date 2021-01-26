import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { CustomProvider } from "./CustomProvider";

ReactDOM.render(
  <CustomProvider>
    <App />
  </CustomProvider>,
  document.getElementById("root")
);
