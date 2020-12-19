import React, { useEffect, useState } from "react";
import { request } from "../../libs/request";
import { Loader } from "../components/Loader";
import { NoDetails } from "../components/NoDetails";
import { Link } from "react-router-dom";
import style from "./user.css";
import { object, string } from "yup";
import { REQUIED } from "../../libs/messages";
import { Form } from "../../libs/FormComponent";
import { toast } from "react-toastify";

const rejectSchema = object().shape({
  remarks: string().required(REQUIED),
});

const ProfileDetail = ({ match }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verifing, setVerifing] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const verify = async (e) => {
    e.preventDefault();
    console.log("verifing");
    const { idx } = match.params;
    setVerifing(true);
    try {
      const { data } = await request({
        name: "profile-verify",
        method: "post",
        idx: idx,
      });
      data.detail && toast(data.detail, { tye: "success" });
    } catch (error) {
      const { data } = error.response;
      data.detail && toast(data.detail, { type: "error" });
    } finally {
      setVerifing(false);
    }
  };

  const reject = async (data) => {
    const { idx } = match.params;
    setRejecting(true);
    try {
      const { data } = await request({
        name: "profile-reject",
        method: "post",
        data: data,
        idx: idx,
      });
      data.detail && toast(data.detail, { tye: "success" });
    } catch ({ response }) {
      const { data } = response;
      data.detail && toast(data.detail, { type: "error" });
    } finally {
      setRejecting(false);
    }
  };

  useEffect(async () => {
    const { idx } = match.params;
    setLoading(true);
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
      setLoading(false);
    }
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
        <div className="ui padded segment borderless">
          <div
            onClick={verify}
            className={`ui primary button ${verifing ? "loading" : ""}`}
          >
            Verify
          </div>
          <div className="ui horizontal divider">OR</div>
          <Form
            validation={rejectSchema}
            onSubmit={reject}
            fields={[
              { name: "remarks", type: "textarea", label: "Remarks", rows: 2 },
            ]}
            actions={[{ type: "submit", label: "Reject", loading: rejecting }]}
          />
        </div>
      ) : (
        <React.Fragment>
          {!match.params.idx && profile.status !== "Verified" ? (
            <Link
              to={`/profile/create/${profile.id}`}
              className="ui primary button"
            >
              Update
            </Link>
          ) : null}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export { ProfileDetail };
