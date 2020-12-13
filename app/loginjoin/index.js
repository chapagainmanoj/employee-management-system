import React from "react";
import { render } from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "../../semantic-ui/semantic.less";
import "../global.css";
import { Login } from "./Login.js";
import { Register } from "./Register.js";

const target = document.getElementById("index");

const NotFound = () => {
  return (
    <div className="ui segment">
      <h1>Page not found. It's a 404</h1>
    </div>
  );
};

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
    </Switch>
  </BrowserRouter>,
  target
);
