import React from "react";
import styles from "./user.css";

const UserInfo = () => {
  return (
    <React.Fragment>
      <div className="ui padded segment borderless">
        <div className="ui items">
          <div className="item">
            <div className="image">
              <img
                className={styles.profileImage}
                src="http://simpleicon.com/wp-content/uploads/users.png"
                alt=""
              />
            </div>
            <div className="content">
              {_k.first_name && _k.last_name && (
                <h4 className="header">
                  {_k.first_name} {_k.last_name}
                </h4>
              )}
              <div className="description">
                <h4 className="header">{_k.username}</h4>
                {_k.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { UserInfo };
