import React from "react";
import DataRow from "./_DataRow";

export default props => {
  const { resetVal, valueToFetch, inputBoxValue } = props;
  const dataFetching = data => {
    props.dataFetch(data);
    return <div className="loader" />;
  };

  const previewOutput = val => {
    if (val instanceof Object) {     
       let highLight= inputBoxValue === "" ? false: inputBoxValue;     
        return val.map(each => {
        return <DataRow key={each.name} data={each} textHighlight={highLight} />;
      });
    }

    return <p style={{ marginTop: "10px" }}>{val}</p>;
  };

  return (
    props.valueToFetch.val !== "" &&
    props.valueToFetch.val && (
      <div className="search-results">
        {resetVal === true
          ? dataFetching(valueToFetch)
          : previewOutput(props.dataFetchResult)}
      </div>
    )
  );
};
