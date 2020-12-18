import React, { useState } from "react";
import { Dawn } from "../helper/assetHelper";
import styles from "./loginjoin.css";
import { object, string, boolean } from "yup";
import { Form } from "../libs/FormComponent";
import { REQUIED } from "../libs/messages";
import { request } from "../libs/request";
import { parseFormError } from "../libs/misc";

const formSchema = object().shape({
  first_name: string(),
  last_name: string(),
  username: string().required(REQUIED),
  email: string(),
  password: string().required(REQUIED),
  agree: boolean().required(REQUIED),
});
const formFields = [
  [
    { name: "first_name", type: "text", label: "First Name" },
    { name: "last_name", type: "text", label: "Last Name" },
  ],
  { name: "username", type: "text", label: "Username" },
  { name: "email", type: "text", label: "Email" },
  { name: "password", type: "password", label: "Password" },
  {
    name: "agree",
    type: "checkbox",
    value: true,
    label: "I agree to the Terms and Conditions",
  },
];

const defaults = { agree: true };

const formActions = [
  { type: "submit", buttonClass: "basic teal", label: "REGISTER" },
];

const Register = () => {
  const [remoteChange, setRemoteChange] = useState(null);
  const [formError, setFormError] = useState(null);

  const onSubmit = (data) => {
    request({
      name: "user-register",
      method: "post",
      data: data,
    })
      .then((resp) => {
        console.log(resp);
        if (resp.status == 201) {
          window.location.replace("/");
        }
      })
      .catch((error) => {
        error.response.data &&
          setFormError(parseFormError(error.response.data));
      });
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
                defaults={defaults}
                validation={formSchema}
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
