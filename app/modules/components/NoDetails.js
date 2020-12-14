import React from "react";
import { Link } from "react-router-dom";

const NoDetails = ({ addLink }) => {
  return (
    <div className="ui padded placeholder segment borderless">
      <div className="ui icon header">
        <i className="file alternate outline icon teal"></i>
        No detail was found.
      </div>
      {addLink && (
        <Link to={addLink} className="ui teal basic button">
          <i className="icon plus"></i>Add Details
        </Link>
      )}
    </div>
  );
};

export { NoDetails };
