import React from "react";

export default props => {
  return (
    <div className="search-regional">
         {props.regions.map((each, index) => {
        let isSelected =
          props.regionSelected === each ? "region selected" : "region";
        return (
          <span
            key={index}
            className={isSelected}
            onClick={props.regionTrigger}
          >
            {each}
          </span>
        );
      })}
    </div>
  );
};
