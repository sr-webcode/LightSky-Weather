import React, { Component } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GraphResults from "./_graphResults";
import MiniCountryList from "./_miniCountryList";

export default class _History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currDate: new Date(),
      countryDetails: { name: "", coords: [] },
      countryList: [],
      previewGraph: false
    };
    this.setCountry = this.setCountry.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  validateFields() {
    let toLookUp = null;
    const validateCountryName = name => {
      const countryResult = this.state.countryList.filter(country => {
        toLookUp = country.latlng;
        return country.name.toLowerCase() === name.toLowerCase();
      });
      return countryResult.length > 0;
    };
    const validValues = (entry, value) => {
      switch (entry) {
        case "country":
          if (value !== null && value !== "" && validateCountryName(value)) {
            return true;
          }
          return false;
        case "date":
          if (value !== null && value !== "" && value.getMonth) {
            return true;
          }
          return false;
        default:
          return false;
      }
    };
    if (
      validValues("date", this.state.countryDetails.name) &&
      validValues("country", this.state.currDate)
    ) {
      console.log(`can begin searching`);
      console.log(toLookUp);
      return;
    }
    console.log("cannot search!");
  }
  API_CALL() {
    const url = "https://restcountries.eu/rest/v2/all?fields=name;latlng";
    const req = new Request(url, {
      method: "GET",
      mode: "cors"
    });
    fetch(req)
      .then(res => res.json())
      .then(res => this.setState({ countryList: [...res] }))
      .catch(err => console.log(err.message));
  }
  componentDidMount() {
    this.API_CALL();
  }

  setCountry(e) {
    this.setState({
      countryDetails: {
        name: e.target.value.trim(),
        coords: []
      }
    });
  }

  handleDateChange(val) {
    this.setState({ currDate: val });
  }

  render() {
    console.log(this.state.countryDetails.name);
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
            onChange={this.handleDateChange}
            popperPlacement="top-end"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={25}
            placeholderText="Select date.."
            id="placeholder-date-picker"
          />

          <input
            className="history-text"
            type="text"
            placeholder="Enter country name.."
            value={this.state.country}
            onChange={this.setCountry}
          />

          <button className="history-btn" onClick={this.validateFields}>
            Get Data
          </button>

          {this.state.countryDetails.name.trim().length !== 0 && (
            <MiniCountryList
              orgList={this.state.countryList}
              filterVal={this.state.countryDetails.name}
            />
          )}
        </div>
        {this.state.previewGraph && <GraphResults />}
      </div>
    );
  }
}
