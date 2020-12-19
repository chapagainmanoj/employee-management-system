import React, { useState, useEffect } from "react";
import { mixed, object, string } from "yup";
import { Form } from "../../libs/FormComponent";
import { REQUIED } from "../../libs/messages";
import { jsonToForm, parseFormError } from "../../libs/misc";
import { request } from "../../libs/request";
import { useHistory, useParams } from "react-router-dom";

const formSchema = object().shape({
  company: string().required(REQUIED),
  location: string(),
  year: string(),
  // document: mixed(),
});

const formFields = [
  {
    name: "company",
    type: "text",
    label: "Company",
    placeholder: "Enter Company",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "Enter location",
  },
  {
    name: "year",
    type: "text",
    label: "Start - End Year",
    placeholder: "Enter start - end year",
  },
  { name: "document", label: "Doc", type: "file" },
];

const WorkExperienceCreate = () => {
  const [remoteChange, setRemoteChange] = useState(null);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { idx } = useParams();

  const onSubmit = async (data) => {
    let payload = { ...data, profile: idx };
    try {
      setLoading(true);
      const { resp: data } = await request({
        name: "workexperience-list",
        method: "post",
        data: jsonToForm(payload),
      });
      history.goBack();
    } catch (err) {
      const { response } = err;
      console.log(err);
      if (response && response.data) {
        setFormError(parseFormError(response.data));
      }
    } finally {
      setLoading(false);
    }
  };
  const formActions = [
    {
      type: "submit",
      buttonClass: "basic teal",
      label: "Save",
      loading: loading,
    },
    {
      type: "neutral",
      buttonClass: "basic",
      label: "Cancel",
      onClick: history.goBack,
    },
  ];
  return (
    <div className="ui padded segment">
      <Form
        onSubmit={onSubmit}
        formUpdater={remoteChange}
        extraError={formError}
        fields={formFields}
        actions={formActions}
      />
    </div>
  );
};

export { WorkExperienceCreate };
