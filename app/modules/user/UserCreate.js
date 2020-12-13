import React from "react";

const UserCreate = () => {
  return (
    <div className="ui padded segment">
      <h4>User Create</h4>
      <form className="ui form">
        <h4 class="ui dividing header">Personal Information</h4>
        <div className="field">
          <label>First Name</label>
          <input type="text" name="first-name" placeholder="First Name" />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input type="text" name="last-name" placeholder="Last Name" />
        </div>
        <h4 class="ui dividing header">Academic Information</h4>
        <div className="field">
          <div className="ui checkbox">
            <input type="checkbox" />
            <label>I agree to the Terms and Conditions</label>
          </div>
        </div>
        <h4 class="ui dividing header">Work Experiance Information</h4>
        <div className="field">
          <label>First Name</label>
          <input type="text" name="first-name" placeholder="First Name" />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input type="text" name="last-name" placeholder="Last Name" />
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export { UserCreate };
