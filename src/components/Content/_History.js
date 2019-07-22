  import React, { Component, Fragment } from "react";
  import Datepicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";

  export default class _History extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currDate: new Date()
      };
      this.handleChange = this.handleChange.bind(this);
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
              placeholder="Enter country name.."
              readOnly
            />
            <button className="history-btn">Get Data</button>
          </div>
        </div>
      );
    }
  }
