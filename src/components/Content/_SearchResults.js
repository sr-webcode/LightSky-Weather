import React from "react";
import DataRow from "./_DataRow";

export default props => {
  const { resetVal, valueToFetch } = props;

  const dataFetching = data => {
    props.dataFetch(data);
    return <div className="loader" />;
  };

  return (
    props.valueToFetch.val !== "" && (
      <div className="search-results">
        {resetVal === true
          ? dataFetching(valueToFetch)
          : props.dataFetchResult.map(each => {
              return <DataRow key={each.name} data={each} />;
            })}
      </div>
    )
  );
};
