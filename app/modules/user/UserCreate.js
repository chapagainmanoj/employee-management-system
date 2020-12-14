import React, { useEffect, useState } from "react";
import { string, object, boolean } from "yup";
import { Form } from "../../libs/FormComponent";
import { REQUIED } from "../../libs/messages";
import { request } from "../../libs/request";
import styles from "./user.css";

const formSchema = object().shape({
  username: string().required(REQUIED),
  email: string().required(REQUIED),
  password: string().required(REQUIED),
  first_name: string(),
  last_name: string(),
  is_staff: boolean(),
});
const formFields = [
  [
    {
      name: "first_name",
      type: "text",
      label: "First Name",
      placeholder: "Enter First Name",
    },
    {
      name: "last_name",
      type: "text",
      label: "Last Name",
      placeholder: "Enter Last Name",
    },
  ],
  {
    name: "username",
    type: "text",
    label: "Username",
    placeholder: "Enter Username",
  },
  {
    name: "email",
    type: "text",
    label: "Email",
    placeholder: "Enter User Email",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Set Password",
  },
  { name: "is_staff", type: "checkbox", label: "Is Staff" },
];
const defaults = {};
const formActions = [{ type: "submit", buttonClass: "basic teal" }];

const UserCreate = ({ match }) => {
  const [user, setUser] = useState(defaults);
  const [remoteChange, setRemoteChange] = useState(null);
  const [formError, setFormError] = useState(null);

  useEffect(() => {}, [match.params.idx]);

  const onSubmit = (data) => {
    console.log("submit", data);
    request({
      name: match.params.idx ? "user-detail" : "user-list",
      method: "post",
      id: match.params.idx,
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
    <div className={`ui segment borderless ${styles.bottomSpace}`}>
      <h4 className="ui header">Create User</h4>
      <Form
        validation={formSchema}
        onSubmit={onSubmit}
        fieldUpdater={remoteChange}
        extraError={formError}
        fields={formFields}
        actions={formActions}
        formClass="mgTop20"
      />
    </div>
  );
};

export { UserCreate };
