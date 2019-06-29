import React from "react";

export default props => {
  return (
    <div className="search-results">
      {props.currentRegion === null ? <div className="loader" /> : "mern"}
    </div>
  );
};

