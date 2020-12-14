import React from "react";
import { RenderRoutes } from "./libs/RenderRoutes";
import { TestForm, TopNav, GlobalErrorBoundary } from "./modules/components";
import { ProfileCreate, UserHome, UserList, UserCreate } from "./modules/user";

const routes = [
  {
    path: "/",
    title: "Home",
    exact: true,
    component: UserHome,
  },
  {
    path: "/user/list",
    title: "User List",
    exact: true,
    component: UserList,
  },
  {
    path: "/user/create/:idx?",
    title: "Create User",
    exact: true,
    component: UserCreate,
  },
  {
    path: "/profile/create/:idx?",
    title: "Create Profile",
    exact: true,
    component: ProfileCreate,
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
