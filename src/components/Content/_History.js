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
      countryDetails: { name: "", coords: null },
      countryList: [],
      previewGraph: false,
      previewDropdown: false
    };
    this.setCountry = this.setCountry.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  validateFields() {
    const validateCountryName = name => {
      const countryResult = this.state.countryList.filter(country => {
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
      validValues("country", this.state.countryDetails.name) &&
      validValues("date", this.state.currDate)
    ) {
      this.setState({ previewGraph: true });
      return;
    }
    this.setState({ previewGraph: false });
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
    const previewValidation = name => {
      const filtered = this.state.countryList.filter(each => {
        return each.name.toLowerCase() === name.toLowerCase();
      });
      return filtered.length > 0 ? true : false;
    };

    let value = null;
    switch (e.target.tagName.toLowerCase()) {
      case "input":
        this.setState({ previewDropdown: true });
        value = e.currentTarget.value;
        break;
      case "li":
        value = e.currentTarget.textContent;
        break;
      default:
        return false;
    }

    this.setState({
      countryDetails: {
        name: value,
        coords: [
          ...this.state.countryList
            .filter(each => {
              if (each.name.toLowerCase() === value.toLowerCase()) {
                return each;
              }
            })
            .map(each => {
              return each.latlng;
            })
        ]
      },
      previewDropdown: previewValidation(value) === true ? false : true
    });
  }

  handleDateChange(val) {
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
            value={this.state.countryDetails.name}
            onChange={this.setCountry}
          />

          <button className="history-btn" onClick={this.validateFields}>
            Get Data
          </button>

          {this.state.countryDetails.name.trim().length !== 0 &&
            this.state.previewDropdown && (
              <MiniCountryList
                setCountry={this.setCountry}
                orgList={this.state.countryList}
                filterVal={this.state.countryDetails.name}
              />
            )}
        </div>

        {this.state.previewGraph && (
          <GraphResults
            date={this.state.currDate}
            coords={this.state.countryDetails.coords}
            country={this.state.countryDetails.name}
          />
        )}
      </div>
    );
  }
}
