import React from "react";

export default props => {
  return (
    <div className="search-regional">
      {props.regions.map((each, index) => {
        return (
          <span key={index} className="region" onClick={props.regionTrigger}>
            {each}
          </span>
        );
      })}
    </div>
  );
};
