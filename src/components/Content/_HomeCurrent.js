import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default props => {
  const { tz, temp, sum, icon, windSpeed } = props.data;

  return (
 
      <div className="home-info-current">
        <span className="tempToggler" onClick={props.triggerTemp}>
          <p>°F</p>
          <p>°C</p>
        </span>
        <div className="timezone">{tz}</div>
        <div className="weather-icon">
          {icon && (
            <ReactAnimatedWeather
              icon={iconNameConvert(icon)}
              color={"white"}
              size={200}
            />
          )}
        </div>

        <div className="weather-details">
          <p className="temp">
            {props.tempSign === "C"
              ? props.toCelsius(temp) + "°"
              : props.toFahrenheit(temp) + "°"}
            <FontAwesomeIcon icon="thermometer-half" />
          </p>
          <p className="wind">
            <FontAwesomeIcon icon="wind" />
            {windSpeed}
          </p>
          <p className="summary">{sum}</p>
        </div>
      </div>
  
  );
};

function iconNameConvert(icon) {
  let imgCopy = icon;
  imgCopy = imgCopy
    .split("")
    .map(each => {
      if (each === "-") {
        return "_";
      } else {
        return each.toUpperCase();
      }
    })
    .join("");

  return imgCopy;
}
