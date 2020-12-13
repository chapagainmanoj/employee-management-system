import React from "react";
import { RenderRoutes } from "./libs/RenderRoutes";
import GlobalErrorBoundary from "./modules/components/GlobalErrorBoundary";

import { TopNav } from "./modules/components";
import { UserInfo } from "./modules/user/UserInfo";
import { UserList } from "./modules/user/UserList";
import { UserCreate } from "./modules/user/UserCreate";

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
