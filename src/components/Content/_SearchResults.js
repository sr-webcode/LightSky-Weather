import React from "react";

export default props => {
  return (
    <ul className="region-results">
      {props.regionSelectedResults &&
        props.regionSelectedResults.map(each => {
           return <li key={uniqueGen(each.name,each.latlng)}>{each.name}</li>;
        })}
    </ul>
  );
};

function uniqueGen(country,latlng) {
  let unique = country
    .split("")
    .map(letter => {
      return letter !== " " ? letter : "_";
    })
    .concat(latlng)
    .reverse()
    .sort((a, b) => {
      return b - a;
    }).join("");    
    return unique;
}
