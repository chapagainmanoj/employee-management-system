import React, { useState } from "react";
import { Dawn } from "../helper/assetHelper";
import { Form } from "../libs/FormComponent";
import styles from "./loginjoin.css";
import { object, shape, string, number } from "yup";
import { REQUIED } from "../libs/messages";
import { request } from "../libs/request";

const formSchema = object().shape({
  username: string().required(REQUIED),
  password: string().required(REQUIED),
});
const formFields = [
  { name: "username", type: "text", label: "Username" },
  { name: "password", type: "password", label: "Password" },
];
const formActions = [{ type: "submit", buttonClass: "basic teal" }];

const Login = () => {
  const [remoteChange, setRemoteChange] = useState(null);
  const [formError, setFormError] = useState(null);

  const onSubmit = (data) => {
    request({
      name: "auth-login",
      method: "post",
      data: data,
    })
      .then((resp) => {
        if (resp.status == 200) {
          window.location.replace("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
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
              <h3 className="ui header teal">Login</h3>
              <Form
                validation={formSchema}
                onSubmit={onSubmit}
                fieldUpdater={remoteChange}
                extraError={formError}
                fields={formFields}
                actions={formActions}
                formClass={styles.mgT30}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.pd50} ${styles.mgT30}`}>
          Don't have account yet?{" "}
          <a className={`${styles.link}`} href="/register">
            REGISTER
          </a>
        </div>
      </div>
    </div>
  );
};

export { Login };
