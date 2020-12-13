import React from "react";
import { Switch, Route } from "react-router-dom";

export const RenderRoutes = (props) => {
  return (
    <Switch>
      {props.routes.map((route) => {
        return route.hasComponent != false && route.path ? (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            fullWidth={route.fullWidth}
            strict={route.strict}
            render={(data) => {
              let title = route.tabTitle || route.title;
              document.title = title ? `${title} - Mars` : "Mars";
              let Component = route.component;
              return <Component {...props} {...data} />;
            }}
          />
        ) : null;
      })}
      <Route
        path="*"
        render={() => <div className="ui padded segment">Page not found.</div>}
      />
    </Switch>
  );
};
