import React, { useEffect, useState } from "react";
import { request } from "../../libs/request";
import { Loader } from "../components/Loader";
import { NoDetails } from "../components/NoDetails";
import style from "./user.css";

const ProfileDetail = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    request({
      name: "profile-my",
      method: "get",
    })
      .then((response) => {
        const { data } = response;
        setProfile(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const { response } = error;
        if (response) console.error(response);
      });
  }, []);
  if (loading) return <Loader />;
  if (!profile) return <NoDetails addLink="/profile/create" />;
  return (
    <React.Fragment>
      <div className="ui padded segment borderless">
        <h4>Personal Information</h4>
        <div className="ui grid two column">
          <div className="ui list column">
            <div className="item">
              <div class="header">Name</div>
              {profile.name}
            </div>
            <div className="item">
              <div class="header">Designation</div>
              {profile.designation}
            </div>
            <div className="item">
              <div class="header">DOB</div>
              {profile.dob}
            </div>
            <div class="item">
              <div class="header">Gender</div>
              {profile.gender}
            </div>
          </div>
          <div className="ui list column">
            <div class="item">
              <div class="header">Address</div>
              {profile.primary_address}
            </div>
            <div className="item">
              <div class="header">Secondary Address</div>
              {profile.secondary_address || "-"}
            </div>
            <div class="item">
              <div class="header">Status</div>
              {profile.status}
            </div>
            {profile.remarks && (
              <div className="item">
                <div class="header">Remarks</div>
                {profile.remarks}
              </div>
            )}
            <div class="item">
              <div class="header">Hobbies</div>
              {profile.hobbies || "-"}
            </div>
          </div>
        </div>
        <div className="ui divider"></div>
        <h4>Academic Information</h4>
        <div className="ui grid two column">
          {profile.academic_profile.map((i) => {
            return (
              <div className="ui list column">
                <div className="item">
                  <div className="header">{i.degree}</div>
                  {i.school} {i.location}
                </div>
              </div>
            );
          })}
        </div>
        <div className="ui divider"></div>
        <h4>Work Experience</h4>
        <div className="ui grid two column">
          {profile.work_experience.map((item) => {
            return (
              <div className="ui list column">
                <div className="item">
                  <div className="header">Company</div>
                  {item.company}
                </div>
                <div className="item">
                  <div className="header">Year</div>
                  {item.year}
                </div>
                <div className="item">
                  <div className="header">Location</div>
                  {item.location}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {_k.is_staff ? (
        <React.Fragment>
          <div className="ui primary button">Verify</div>
          <div className="ui primary button">Reject</div>
        </React.Fragment>
      ) : (
        <div className="ui primary button">Update</div>
      )}
    </React.Fragment>
  );
};

export { ProfileDetail };
