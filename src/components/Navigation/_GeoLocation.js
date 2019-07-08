import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const _invalidPage = props => {
  return (
    <div className="notFound">
      <span>
        {props.message === "" ? (
          <div className="loader" />
        ) : (
          <span>
            <FontAwesomeIcon icon="exclamation-circle" />
            <p>{props.message}</p>
          </span>
        )}
      </span>
    </div>
  );
};

export default _invalidPage;
