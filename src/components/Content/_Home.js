import React, { Component, Fragment } from "react";

import Current from "./_HomeCurrent";
import Forecast from "./_HomeForeCast";
import GeoLocation from "../Navigation/_GeoLocation";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      current: "",
      foreCast: [],
      tempSign: "C",
      geoLocation: {
        enabled: false,
        message: ""
      }
    };

    this.positionSuccess = this.positionSuccess.bind(this);
    this.positionError = this.positionError.bind(this);
    this.tempSignChange = this.tempSignChange.bind(this);
    this.toCelsius = this.toCelsius.bind(this);
    this.toFahrenheit = this.toFahrenheit.bind(this);
    this.fetchLocation = this.fetchLocation.bind(this);
    this.beginRecall = this.beginRecall.bind(this);
  }

  componentDidMount() {
    this.fetchLocation();
  }

  fetchLocation() {
    navigator.geolocation.getCurrentPosition(
      this.positionSuccess,
      this.positionError
    );
  }

  beginRecall(note) {
    this.fetchLocation();
    return <GeoLocation message={note} />;
  }

  positionSuccess(pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    //CALL API
    this.API_CALL(lat, long);
  }

  positionError(err) {
    this.setState({
      geoLocation: {
        enabled: false,
        message: err.message
      }
    });
  }

  API_CALL(lat, long) {
    let PROXY = "https://cors-anywhere.herokuapp.com/";
    let ENDPOINT = `https://api.darksky.net/forecast/744e7d6b0439574aaa1141614a80f683/${lat},${long}?exclude=hourly,flags`;
    let URI = PROXY + ENDPOINT;

    let REQ = new Request(URI, {
      method: "GET",
      mode: "cors"
    });

    fetch(REQ)
      .then(resp => {
        return resp.json();
      })
      .then(resp => {
        let wind = resp.currently.windSpeed + "mph";
        let icon = resp.currently.icon;

        let tempCelsius = resp.currently.apparentTemperature;
        let summary = resp.currently.summary;
        let timezone = resp.timezone.substring(resp.timezone.indexOf("/") + 1);
        let forCastdays = resp.daily.data;

        let weatherPeriod = [];
        for (let x = 1; x < 5; x++) {
          weatherPeriod = [...weatherPeriod, forCastdays[x]];
        }

        this.setState({
          current: {
            icon: icon,
            temp: tempCelsius,
            sum: summary,
            tz: timezone,
            windSpeed: wind
          },
          foreCast: [...weatherPeriod],
          geoLocation: {
            enabled: true,
            message: ""
          }
        });
      })
      .catch(err => {
        alert(err + "Please Refresh your browser!");
      });
  }

  tempSignChange(e) {
    e.currentTarget.classList.contains("togglerActive")
      ? this.stateCelsius(e)
      : this.stateFahrenheit(e);
  }

  toCelsius(f) {
    let converted = Math.floor(((f - 32) * 5) / 9);
    return converted;
  }

  toFahrenheit(c) {
    let firstConvert = this.toCelsius(c);
    let converted = Math.floor((firstConvert * 9) / 5) + 32;
    return converted;
  }

  stateCelsius(e) {
    e.currentTarget.classList.remove("togglerActive");
    this.setState({ tempSign: "C" });
  }
  stateFahrenheit(e) {
    e.currentTarget.classList.add("togglerActive");
    this.setState({ tempSign: "F" });
  }

  render() {
    return !this.state.geoLocation.enabled ? (
      this.beginRecall(this.state.geoLocation.message)
    ) : (
      <div className="home-info">
        {this.state.foreCast.length < 0 ? (
          <div className="loader" />
        ) : (
          <Fragment>
            <Current
              data={this.state.current}
              triggerTemp={this.tempSignChange}
              tempSign={this.state.tempSign}
              toCelsius={this.toCelsius}
              toFahrenheit={this.toFahrenheit}
            />
            <Forecast
              data={this.state.foreCast}
              tempSign={this.state.tempSign}
              toCelsius={this.toCelsius}
              toFahrenheit={this.toFahrenheit}
            />
          </Fragment>
        )}

        <span className="attribution">
          Powered by:
          <a href="https://darksky.net/poweredby/" id="">
            Dark Sky API
          </a>
        </span>
      </div>
    );
  }
}
