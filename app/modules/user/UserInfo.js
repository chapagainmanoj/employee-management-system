import React from "react";
import { Link } from "react-router-dom";

const UserInfo = () => {
  return (
    <React.Fragment>
      <div className="ui padded segment">
        <div className="ui grid">
          <div className="four wide column">
            <div>
              <img
                style={{ width: "100px", height: "100px" }}
                src="http://simpleicon.com/wp-content/uploads/users.png"
                alt=""
              />
            </div>
          </div>
          <div className="twelve wide column">
            <div className="ui basic segment">
              <h4>User Name</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="ui padded placeholder segment">
        <div className="ui icon header">
          <i className="file alternate outline icon teal"></i>
          Details has not been subbmitted.
        </div>
        <Link to="/user/create" className="ui teal basic button">
          <i className="icon plus"></i>Add Details
        </Link>
      </div>
      <div className="ui padded segment">
        <h4>Personal Info</h4>
        <div className="ui list">
          <div className="item">
            <div class="header">New York City</div>A lovely city
          </div>
          <div class="item">
            <div class="header">Chicago</div>
            Also quite a lovely city
          </div>
        </div>
        <div className="ui divider"></div>
        <h4>Academic Info</h4>
        <div class="ui list">
          <div class="item">
            <div class="header">New York City</div>A lovely city
          </div>
          <div class="item">
            <div class="header">Chicago</div>
            Also quite a lovely city
          </div>
        </div>
        <div className="ui divider"></div>
        <h4>Work Experience</h4>
        <div class="ui list">
          <div class="item">
            <div class="header">New York City</div>A lovely city
          </div>
          <div class="item">
            <div class="header">Chicago</div>
            Also quite a lovely city
          </div>
        </div>
      </div>
      <div className="ui primary button">Update</div>
      <div className="ui primary button">Verify</div>
      <div className="ui primary button">Reject</div>
    </React.Fragment>
  );
};

export { UserInfo };
