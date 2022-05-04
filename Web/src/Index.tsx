/*
 * @Date: 2021-05-03 14:49:30
 * @LastEditTime: 2021-05-03 15:07:29
 * @Description:
 */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);
