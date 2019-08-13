import React, { Component } from "react";
import Charts from "./_charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class _graphResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      country: "",
      date: "",
      valid: true
    };
    this.API_REQUEST = this.API_REQUEST.bind(this);
    this.requestResults = this.requestResults.bind(this);
  }

  API_REQUEST() {
    let PROXY = "https://cors-anywhere.herokuapp.com/";
    let ENDPOINT = `https://api.darksky.net/forecast/744e7d6b0439574aaa1141614a80f683/${
      this.props.coords[0][0]
    },${this.props.coords[0][1]},${Math.floor(
      this.props.date.getTime() / 1000
    )}?exclude=flags,daily,currently`;

    const uri = PROXY + ENDPOINT;
    const timeRequest = new Request(uri, {
      method: "GET",
      mode: "cors"
    });

    fetch(timeRequest)
      .then(res => res.json())
      .then(res => {
        if (res.hasOwnProperty("code")) {
          this.setState({
            country: this.props.country,
            date: this.props.date,
            valid: false
          });
          return;
        }
        this.setState({
          results: res.hourly.data,
          country: this.props.country,
          date: this.props.date,
          valid: true
        });
      })
      .catch(err => console.log(err));
  }

  requestResults() {
    this.API_REQUEST();
    return <span className="loader" />;
  }

  render() {
    let lookupAgain = false;
    if (
      this.state.country !== this.props.country ||
      this.state.date !== this.props.date
    ) {
      lookupAgain = true;
    }
    return (
      <div className="graph">
        {this.props.coords.length > 0 && lookupAgain === true ? (
          this.requestResults()
        ) : this.state.valid ? (
          <Charts valid={this.state.valid} data={this.state.results} />
        ) : (
          <span className="error-date">
            <FontAwesomeIcon icon="exclamation-circle" />
            Invalid Date. Please try again!.
          </span>
        )}
      </div>
    );
  }
}

export default _graphResults;
