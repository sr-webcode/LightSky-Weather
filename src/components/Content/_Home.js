import React, { Component, Fragment } from "react";

import Current from "./_HomeCurrent";
import Forecast from "./_HomeForeCast";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      current: "",
      foreCast: [],
      tempSign: "C"
    };
    this.positionSuccess = this.positionSuccess.bind(this);
    this.positionError = this.positionError.bind(this);
    this.tempSignChange = this.tempSignChange.bind(this);
    this.toCelsius = this.toCelsius.bind(this);
    this.toFahrenheit = this.toFahrenheit.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.positionSuccess,
      this.positionError
    );
  }

  positionSuccess(pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    //CALL API
    this.API_CALL(lat, long);
  }

  positionError(err) {
    console.log(err);
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
          foreCast: [...weatherPeriod]
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
        
    return (
      //put a mini loader here just in case of slow network request!
         <div className="home-info">
        {this.state.foreCast.length > 0 && (
          <Current
            data={this.state.current}
            triggerTemp={this.tempSignChange}
            tempSign={this.state.tempSign}
            toCelsius={this.toCelsius}
            toFahrenheit={this.toFahrenheit}
          />
        )}
        {this.state.foreCast.length > 0 && (
          <Forecast
            data={this.state.foreCast}
            tempSign={this.state.tempSign}
            toCelsius={this.toCelsius}
            toFahrenheit={this.toFahrenheit}
          />
        )}
      </div>
    );
  }
}
