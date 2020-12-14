import React, { useState, useEffect } from "react";
import { request } from "../../libs/request";
import { Loader } from "../components";
import { Table } from "../components/Table";

const column = [
  { label: "Name", key: "name" },
  { label: "Designation", key: "designation" },
  { label: "Gender", key: "gender" },
  { label: "Hobbies", key: "hobbies" },
  { label: "Address", key: "primary_address" },
];
const adminColumn = [
  ...column,
  { label: "Seconday Address", key: "primary_address" },
  { label: "Status", key: "status" },
  { label: "DOB", key: "dob" },
  { label: "Remarks", key: "remarks" },
];

const ProfileList = () => {
  const [userList, setUserList] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    request({
      name: "profile-list",
      method: "get",
    })
      .then((response) => {
        const { data } = response;
        setUserList(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const { response } = error;
        if (response) console.error(response);
      });
  }, []);
  if (loading) return <Loader />;
  return (
    <React.Fragment>
      {userList && (
        <Table
          numbered
          columnSchema={_k.is_staff ? adminColumn : column}
          collection={userList}
        />
      )}
    </React.Fragment>
  );
};

export { ProfileList };
