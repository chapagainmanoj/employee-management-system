import React from "react";
import { RenderRoutes } from "./libs/RenderRoutes";
import { TopNav, GlobalErrorBoundary } from "./modules/components";
import {
  ProfileCreate,
  ProfileDetail,
  UserHome,
  UserList,
  UserCreate,
  AcademicCreate,
  WorkExperienceCreate,
} from "./modules/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    path: "/profile/detail/:idx?",
    title: "Profile Detail",
    exact: true,
    component: ProfileDetail,
  },
  {
    path: "/profile/create/:idx?",
    title: "Create Profile",
    exact: true,
    component: ProfileCreate,
  },
  {
    path: "/profile/create/:idx/work",
    title: "Create Work Experience",
    exact: true,
    component: WorkExperienceCreate,
  },
  {
    path: "/profile/create/:idx/academic",
    title: "Create Academic",
    exact: true,
    component: AcademicCreate,
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
        <ToastContainer />
      </div>
    </div>
  );
};

export { App };
