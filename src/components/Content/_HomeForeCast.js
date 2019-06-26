import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export default props => {
  return (
    <div className="home-info-forecast">
      {props.data.length > 0 &&
        props.data.map((each, index) => {
          return toWeatherCards(each, index, props.tempSign,props.toCelsius,props.toFahrenheit);
        })}
    </div>
  );
};

function toWeatherCards(data, index, sign,celsius,fahren) {
  
  return (
    <div key={index} className="forecast-box">
      <p>{timeConvert(data.time)}</p>
      {data.icon && (
        <ReactAnimatedWeather
          icon={iconNameConvert(data.icon)}
          color="white"
          size={120}
        />
      )}
      <p className="temp">
            {sign === "C" ? celsius(data.apparentTemperatureHigh) + "°": fahren(data.apparentTemperatureHigh) + "°"}
        <FontAwesomeIcon icon="thermometer-half" />
      </p>
      <p className="wind">
        <FontAwesomeIcon icon="wind" />
        {data.windSpeed + "mph"}
      </p>
    </div>
  );

}

function timeConvert(time) {
  time = time * 1000;
  return daysOfWeek[new Date(time).getDay()];
}

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
