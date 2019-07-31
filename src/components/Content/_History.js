import React, { Component, Fragment } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Toast from "../Utils/historyToast";

//create country picker component!

export default class _History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currDate: new Date(),
      country: "",
      checkerStatus: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.timeRequest = this.timeRequest.bind(this);
    this.setCountry = this.setCountry.bind(this);
  }

  setCountry(e) {
    this.setState({ country: e.currentTarget.value });
  }

  countrySearch(val) {
    if (val !== "test") {
      return true;
    }
    return false;
  }

  timeRequest() {
    if (this.state.country === "" || this.countrySearch(this.state.country)) {
      return console.log(`cannot search for country name!`);
    }
    return console.log(`searching now.......`);
  }

  handleChange(val) {
    this.setState({ currDate: val });
  }

  render() {
    return (
      <div className="history">
        <div className="history-caption">
          <h2>Time Machine Request</h2>
          <p>
            A Time Machine Request returns the observed (in the past) or
            forecasted (in the future) hour-by-hour weather and daily weather
            conditions for a particular date.
          </p>
          <Datepicker
            className="date-picker"
            selected={this.state.currDate}
            onChange={this.handleChange}
            popperPlacement="top-end"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={25}
          />
          <input
            className="history-text"
            type="text"
            placeholder="Please enter country name..."
            value={this.state.country}
            onChange={this.setCountry}
          />
          <button className="history-btn" onClick={this.timeRequest}>
            Get Data
          </button>
        </div>
      </div>
    );
  }
}
