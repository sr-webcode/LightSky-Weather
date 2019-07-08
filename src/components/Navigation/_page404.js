import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const _Page404 = () => {
  return (
    <div className="notFound">
      <span>
        {" "}
        <FontAwesomeIcon icon="question-circle" />
        404 page not found
      </span>
    </div>
  );
};

export default _Page404;
