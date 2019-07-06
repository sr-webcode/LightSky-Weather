import React, { Component, Fragment } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

class _weatherReport extends Component {
  constructor(props) {
    super(props);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.dataExtract = this.dataExtract.bind(this);
  }

  fetchWeather(coords) {
    //do the fetch now
    const [lat, lng] = coords;
    let key = "744e7d6b0439574aaa1141614a80f683";
    let uri = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${lng}`;
    let request = new Request(uri, {
      method: "GET",
      mode: "cors"
    });

    fetch(request)
      .then(res => res.json())
      .then(res => {
        this.props.track(res);
      })
      .catch(err => console.log(err));
    return <div className="loader" />;
  }

  dataExtract(info) {
    if (info !== null) {
      const { apparentTemperature, icon, summary, windSpeed } = info.currently;
      const { data } = info.daily;
      let selectedDays = data.filter((data, index) => {
        if (index > 0 && index < 5) {
          return data;
        }
      });

      return (
        <Fragment>
          <div className="search-row-desc-image">
            <ReactAnimatedWeather
              icon={iconNameConvert(icon)}
              color="white"
              size={120}
            />
          </div>
          <div className="search-row-desc-text">
            <h2>{toCelsius(apparentTemperature) + "°"}<FontAwesomeIcon icon="thermometer-half" /></h2>
            <p>{summary}</p>
            <p>{windSpeed + " mph"}<FontAwesomeIcon icon="wind" /></p>
          </div>

          <div className="mini-forecast">
            {selectedDays.map((each, index) => {
              return (
                <span key={index}>
                  <p>{timeConvert(each.time)}</p>
                  <ReactAnimatedWeather
                    icon={iconNameConvert(each.icon)}
                    color="white"
                    size={50}
                  />             
                  <p>{toCelsius(each.temperatureMax)+ "°"}</p>
                </span>
              );
            })}
          </div>
        </Fragment>
      );
    }
  }

  render() {
    return (
      <div className="search-row-desc">
        {this.props.wasClicked === true
          ? this.fetchWeather(this.props.coords)
          : this.dataExtract(this.props.payLoad)}
      </div>
    );
  }
}

export default _weatherReport;

function timeConvert(time) {
  time = time * 1000;
  return daysOfWeek[new Date(time).getDay()];
}

function iconNameConvert(icon) {
  let imgCopy = icon;
  return (imgCopy = imgCopy
    .split("")
    .map(each => {
      if (each === "-") {
        return "_";
      } else {
        return each.toUpperCase();
      }
    })
    .join(""));
}

function toCelsius(f) {
  let converted = Math.floor(((f - 32) * 5) / 9);
  return converted;
}
