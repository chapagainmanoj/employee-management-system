import React, { useState } from "react";
import { object, shape, string, number } from "yup";
import { Form } from "../../libs/FormComponent";

const formSchema = object().shape({
  name: string().required(),
  email: string(),
});

const GENDEROPTIONS = [
  { text: "Male", key: "male", value: "male" },
  { text: "Female", key: "female", value: "female" },
];

const formFields = [
  { name: "name", type: "text", label: "Name" },
  { name: "email", type: "text", label: "Email" },
  { name: "isstaff", type: "checkbox", label: "Is staff" },
  [
    { name: "dob", type: "date", label: "Date of birth" },
    { name: "dob", type: "date", label: "Date of birth 2" },
  ],
  { name: "file", type: "file", label: "Profile pic" },
  [{ name: "radio", type: "radio", label: "On / Off" }],
  {
    name: "gender",
    type: "select",
    label: "Gender",
    placeholder: "Select gender",
    options: GENDEROPTIONS,
  },
];

const defaults = {};

const formActions = [{ type: "submit" }, { type: "reset" }];

const TestForm = () => {
  const [filter, setFilter] = useState(defaults);
  const [remoteChange, setRemoteChange] = useState(null);
  const [formError, setFormError] = useState(null);

  const onSubmit = (data) => {
    console.log("submit", data);
  };

  return (
    <div className="ui segment">
      <h4>Test form</h4>
      <Form
        onSubmit={onSubmit}
        fieldUpdater={remoteChange}
        extraError={formError}
        fields={formFields}
        actions={formActions}
      />
      <div class="ui form">
        <div class="field">
          <label>Country</label>
          <select multiple="" class="ui dropdown">
            <option value="">Select Country</option>
            <option value="AF">Afghanistan</option>
            <option value="AX">Åland Islands</option>
            <option value="AL">Albania</option>
            <option value="DZ">Algeria</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export { TestForm };
