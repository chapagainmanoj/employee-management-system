import React, { useState, useEffect } from "react";
import { mixed, object, string } from "yup";
import { Form } from "../../libs/FormComponent";
import { REQUIED } from "../../libs/messages";
import { request } from "../../libs/request";
import { useHistory, useParams } from "react-router-dom";
import { formatDate, jsonToForm, parseFormError } from "../../libs/misc";

const formSchema = object().shape({
  degree: string().required(REQUIED),
  school: string().required(REQUIED),
  location: string(),
  percentage: string(),
  year_attained: string(),
  document: mixed(),
});

const formFields = [
  {
    name: "degree",
    type: "text",
    label: "Degree",
    placeholder: "Enter Degree",
  },
  {
    name: "school",
    type: "text",
    label: "School",
    placeholder: "Enter school name",
  },
  {
    name: "location",
    type: "text",
    label: "Location",
    placeholder: "Enter location",
  },
  {
    name: "percentage",
    label: "Grade",
    type: "text",
    placeholder: "Enter grade / Percentage",
  },
  {
    name: "year_attained",
    label: "Year attained",
    type: "date",
    placeholder: "Enter start - end year",
  },
  { name: "document", label: "Doc", type: "file" },
];

const AcademicCreate = () => {
  const [remoteChange, setRemoteChange] = useState(null);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { idx } = useParams();

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

  const onSubmit = async (data) => {
    let payload = { ...data, profile: idx };
    try {
      setLoading(true);
      const { resp: data } = await request({
        name: "academic-list",
        method: "post",
        data: jsonToForm(payload),
      });
      history.goBack();
    } catch ({ response }) {
      if (response.data) {
        setFormError(parseFormError(response.data));
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="ui padded segment">
      <Form
        onSubmit={onSubmit}
        validation={formSchema}
        fieldUpdater={remoteChange}
        extraError={formError}
        fields={formFields}
        actions={formActions}
      />
    </div>
  );
};

export { AcademicCreate };
