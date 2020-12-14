import React, { useState } from "react";
import { object, shape, string, number } from "yup";
import { Form } from "../../libs/FormComponent";
import { request } from "../../libs/request";
import styles from "./user.css";

const formSchema = object().shape({
  name: string().required(),
  designation: string(),
  dob: string(),
  gender: string(),
  primary_address: string(),
  seconday_address: string(),
  hobbies: string(),
});

const GENDEROPTIONS = [
  { text: "Male", key: "male", value: "Male" },
  { text: "Female", key: "female", value: "Female" },
  { text: "Non-binary", key: "nonbinday", value: "Non-binary" },
  { text: "Transgender", key: "transgender", value: "Transgender" },
  { text: "Intersex", key: "intersex", value: "Intersex" },
  { text: "I prefer not to say", key: "nosay", value: "I prefer not to say" },
];

const formFields = [
  [
    { name: "name", type: "text", label: "Name" },
    { name: "designation", type: "text", label: "Designation" },
  ],
  [
    { name: "dob", type: "date", label: "Date of Birth" },
    {
      name: "gender",
      type: "select",
      label: "Gender",
      placeholder: "Select gender",
      options: GENDEROPTIONS,
    },
  ],
  { name: "primary_address", type: "text", label: "Primary Address" },
  { name: "seconday_address", type: "text", label: "Secondary Address" },
  { name: "hobbies", type: "textarea", label: "Hobbies" },
  //   { name: "file", type: "file", label: "Profile pic" },
];

const defaults = {};

const formActions = [
  { type: "submit", buttonClass: "basic teal" },
  { type: "reset", buttonClass: "basic" },
];

const ProfileCreate = ({ match }) => {
  const [remoteChange, setRemoteChange] = useState(null);
  const [formError, setFormError] = useState(null);

  const onSubmit = (data) => {
    console.log("submit", data);
    request({
      name: match.params.idx ? "profile-detail" : "profile-list",
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
      <h4>Create Profile</h4>

      <Form
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

export { ProfileCreate };
