import React from "react";
import { Dawn } from "../helper/assetHelper";
import styles from "./loginjoin.css";

const Register = () => {
  console.log(Dawn);
  return (
    <div className={styles.loginjoin}>
      <div
        className={styles.left}
        style={{
          backgroundImage: "url(http://192.168.52.28:8000/assets/dawn.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <h5 className={styles.title}>Employee Management System</h5>
      </div>
      <div className={styles.right}>
        <div className="ui padded basic segment">
          <h2 className="ui header teal">MILKYWAY</h2>
          <h4>Register</h4>
          <form className="ui form">
            <div className="field">
              <label>First Name</label>
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" />
                <label>I agree to the Terms and Conditions</label>
              </div>
            </div>
            <button className="ui button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { Register };
