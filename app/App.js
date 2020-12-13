import React from "react";
import { RenderRoutes } from "./libs/RenderRoutes";
import { TestForm, TopNav, GlobalErrorBoundary } from "./modules/components";
import { UserInfo, UserList, UserCreate } from "./modules/user";

const routes = [
  {
    path: "/",
    title: "Home",
    exact: true,
    component: UserInfo,
  },
  {
    path: "/user/list",
    title: "User List",
    exact: true,
    component: UserList,
  },
  {
    path: "/user/create",
    title: "User List",
    exact: true,
    component: UserCreate,
  },
  {
    path: "/testform",
    title: "User List",
    exact: true,
    component: TestForm,
  },
];

const App = (props) => {
  return (
    <div>
      <TopNav />
      <div className="ui container">
        <div style={{ marginTop: "65px" }}>
          <GlobalErrorBoundary>
            <RenderRoutes {...props} routes={routes} />
          </GlobalErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export { App };
