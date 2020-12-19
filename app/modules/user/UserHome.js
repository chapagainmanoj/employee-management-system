import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ProfileDetail } from "./ProfileDetail";
import { UserInfo } from "./Info";
import { NoDetails } from "../components/NoDetails";
import { ProfileList } from "./ProfileList";
import styles from "./user.css";

const MENU = [
  {
    key: "profile",
    title: "Profile",
    component: ProfileDetail,
    accessible: !_k.is_staff,
  },
  { key: "staff", title: "Staff Directory", component: ProfileList },
  { key: "birthday", title: "Birthday List", component: NoDetails },
  { key: "notice", title: "Notices", component: NoDetails },
];

const noteryOperator = (booleanValue) => {
  if (typeof booleanValue === "undefined") return true;
  return booleanValue;
};

const UserHome = (props) => {
  const [active, setActive] = useState(_k.is_staff ? "staff" : "profile");
  let ActiveComponent = MENU.find((i) => i.key === active).component;
  return (
    <React.Fragment>
      <UserInfo />
      <div className="ui top attached tabular menu">
        {MENU.map((i) => {
          const isActive = i.key === active ? "active" : "";
          if (noteryOperator(i.accessible)) {
            return (
              <a
                key={i.key}
                onClick={() => setActive(i.key)}
                className={`${isActive} item`}
              >
                {i.title}
              </a>
            );
          } else {
            return null;
          }
        })}
        <div className="right menu">
          {_k.is_staff && (
            <div className="item">
              <Link style={{ textDecoration: "none" }} to="/user/list">
                Manage Users
              </Link>
            </div>
          )}
          <div className="item">
            <div className="ui transparent icon input">
              <input type="text" placeholder="Search staffs..." />
              <i className="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div className={`ui bottom attached segment ${styles.bottomSpace}`}>
        {<ActiveComponent {...props} />}
      </div>
    </React.Fragment>
  );
};

export { UserHome };
