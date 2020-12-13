import React from "react";
import { render } from "react-dom";
import "../semantic-ui/semantic.less";
import { HashRouter, browserHistory } from "react-router-dom";
import "./global.css";

import { App } from "./App.js";

render(
  <HashRouter history={browserHistory}>
    <App />
  </HashRouter>,
  document.getElementById("index")
);
