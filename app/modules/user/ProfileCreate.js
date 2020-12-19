import React, { useState, useEffect } from "react";
import { object, shape, string, number } from "yup";
import { Form } from "../../libs/FormComponent";
import { REQUIED } from "../../libs/messages";
import { request } from "../../libs/request";
import { Table } from "../components/Table";
import styles from "./user.css";
import { Link } from "react-router-dom";
import { parseFormError } from "../../libs/misc";
import { toast } from "react-toastify";

const AcademicAction = ({ record }) => {
  return (
    <div className="ui small icon buttons">
      <Link to="/">
        <i className="icon eye"></i>
      </Link>
    </div>
  );
};

const WorkAction = ({ record }) => {
  return (
    <div className="ui small icon buttons">
      <Link to="/">
        <i className="icon eye"></i>
      </Link>
    </div>
  );
};

const academicColumn = [
  { label: "Degree", key: "degree" },
  { label: "School", key: "school" },
  { label: "Location", key: "location" },
  { label: "Grade", key: "percentage" },
  { label: "Year Attainded", key: "year_attained" },
  { label: "Doc", key: "document" },
];

const workColumn = [
  { label: "Company", key: "company" },
  { label: "Location", key: "location" },
  { label: "Year", key: "year" },
  { label: "Doc", key: "document" },
];

const formSchema = object().shape({
  name: string().required(REQUIED),
  designation: string().required(REQUIED),
  dob: string(),
  gender: string(),
  primary_address: string(),
  seconday_address: string(),
  hobbies: string(),
  user: string(),
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
    {
      name: "dob",
      type: "date",
      showMonthDropdown: true,
      showYearDropdown: true,
      yearDropdownItemNumber: 10,
      useShortMonthInDropdown: true,
      scrollableYearDropdown: true,
      label: "Date of Birth",
    },
    {
      name: "gender",
      type: "select",
      label: "Gender",
      placeholder: "Select gender",
      options: GENDEROPTIONS,
    },
  ],
  [
    { name: "primary_address", type: "text", label: "Primary Address" },
    { name: "seconday_address", type: "text", label: "Secondary Address" },
  ],
  { name: "hobbies", type: "textarea", label: "Hobbies", rows: 2 },
  // { name: "file", type: "file", label: "Profile pic" },
];

const defaults = {};

const ProfileCreate = ({ match, history }) => {
  const [profile, setProfile] = useState({});
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formActions = [
    { type: "submit", buttonClass: "basic teal", label: "Save" },
    {
      type: "neutral",
      buttonClass: "basic",
      label: "Cancel",
      onClick: history.goBack,
    },
  ];

  useEffect(async () => {
    const { idx } = match.params;
    try {
      const { data } = await request({
        name: idx ? "profile-detail" : "profile-my",
        method: "get",
        idx: idx,
      });
      setProfile(data);
    } catch ({ response }) {
      const { data } = response;
      if (response) console.error(data.detail || data);
    } finally {
    }
  }, []);

  const onSubmit = async (payload) => {
    try {
      setLoading(true);
      const { data } = await request({
        name: match.params.idx ? "profile-detail" : "profile-list",
        method: match.params.idx ? "put" : "post",
        idx: match.params.idx,
        data: payload,
      });
      toast("Profile successfully saved.", { type: "success" });
      setProfile(data);
      history.push(`/profile/create/${data.id}`);
    } catch (error) {
      console.log(error, "error");
      if (error.response) {
        setFormError(parseFormError(error.response.data));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`ui segment borderless ${styles.bottomSpace}`}>
      <h4>Create Profile</h4>
      <div className="ui horizontal divider">Personal Information</div>
      <Form
        validation={formSchema}
        onSubmit={onSubmit}
        formUpdater={profile}
        extraError={formError}
        fields={formFields}
        actions={formActions}
        formClass="mgTop20"
      />
      {match.params.idx && (
        <React.Fragment>
          <div className="mgTop40">
            <div className="ui horizontal divider">Academic Information</div>
            {profile.academic_profile &&
              profile.academic_profile.length > 0 && (
                <Table
                  basic
                  collection={profile.academic_profile}
                  tableClass="very basic mgTop30"
                  columnSchema={academicColumn}
                  actions={<AcademicAction />}
                />
              )}
            <Link
              to={`/profile/create/${profile.id}/academic`}
              className="ui teal button basic"
            >
              <i className="icon plus"></i> Add
            </Link>
          </div>

          <div className="mgTop40">
            <div className="ui horizontal divider">
              Work Experience Information
            </div>
            {profile.work_experience && profile.work_experience.length > 0 && (
              <Table
                basic
                collection={profile.work_experience}
                tableClass="very basic mgTop30"
                columnSchema={workColumn}
                actions={<WorkAction />}
              />
            )}
            <Link
              to={`/profile/create/${profile.id}/work`}
              className="ui teal button basic"
            >
              <i className="icon plus"></i> Add
            </Link>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export { ProfileCreate };
