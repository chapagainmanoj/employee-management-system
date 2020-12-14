import React from "react";
import { Link } from "react-router-dom";
import { request } from "../../libs/request";

const TopNav = () => {
  const signout = (e) => {
    e.preventDefault();
    request({
      name: "auth-logout",
      method: "post",
    })
      .then((response) => {
        window.location.reload("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="ui fixed borderless huge menu inverted teal">
      <div className="ui container grid">
        <div className="row">
          <Link to="/" className="header item">
            MILKYWAY
          </Link>
          <a className="right item">
            <i onClick={signout} className="icon sign out alternate"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export { TopNav };
