import React from "react";

const triggerDataFetch = e => {
  return <div className="loader" />;
  //call props trigger change state
};
export default props => {
  
  const { resetVal, valueToFetch } = props;
 
  const dataFetching = data => {
    props.dataFetch(data);
    return <div className="loader" />;
  };

  const DataRow = props => {
    return <div className="search-results-row">{props.data.name}</div>;
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
