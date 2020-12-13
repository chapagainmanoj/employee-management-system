import React, { useState } from "react";
import { Dawn } from "../helper/assetHelper";
import styles from "./loginjoin.css";
import { object, shape, string, number } from "yup";
import { Form } from "../libs/FormComponent";

const formSchema = object().shape({
  username: string().required(),
  password: string().required(),
});
const formFields = [
  { name: "username", type: "text", label: "Username" },
  { name: "password", type: "password", label: "Password" },
  {
    name: "agree",
    type: "checkbox",
    label: "I agree to the Terms and Conditions",
  },
];
const defaults = {};
const formActions = [{ type: "submit", buttonClass: "basic teal" }];

const Register = () => {
  const [filter, setFilter] = useState(defaults);
  const [remoteChange, setRemoteChange] = useState(null);
  const [formError, setFormError] = useState(null);

  const onSubmit = (data) => {
    console.log("submit", data);
  };
  return (
    <div className={styles.loginjoin}>
      <div
        className={styles.left}
        style={{
          backgroundImage: `url(${Dawn})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      ></div>
      <div className={styles.right}>
        <div className={`${styles.header}`}>
          <h1 className={`ui header teal`}>MILKY WAY</h1>
          Employee Management System
        </div>
        <div className="ui grid">
          <div className="ten wide computer sixteen wide tablet sixteen wide mobile column">
            <div
              className={`ui padded basic segment ${styles.mg150} ${styles.pd50}`}
            >
              <h3 className="ui header teal">Register</h3>
              <Form
                onSubmit={onSubmit}
                fieldUpdater={remoteChange}
                extraError={formError}
                fields={formFields}
                actions={formActions}
                formClass={styles.mgT30}
                buttonClass="basic teal"
              />
            </div>
          </div>
        </div>
        <div className={`${styles.pd50} ${styles.mgT30}`}>
          Have account ?{" "}
          <a className={`${styles.link}`} href="/login">
            LOGIN
          </a>
        </div>
      </div>
    </div>
  );
};

export { Register };
