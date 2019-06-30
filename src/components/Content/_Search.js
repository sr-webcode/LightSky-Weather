import React, { Component } from "react";
import RegionalBlock from "./_RegionalBlock";
import SearchResult from "./_SearchResults";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
      regionSelected: null,
      regionSelectedResults: null
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.regionTrigger = this.regionTrigger.bind(this);
  }

  regionTrigger(e) {    
        //please reconfigure this ,,, way to slow if you do api fetch here,.... repaint is so slow.... toggle took to long to respond


        //make it so that everything runs smooth even if the fetch takes some time to load
        
    }

  handleInput(e) {
    //erase selected region
    if (e.target.value === "") {
      this.setState({ regionSelected: this.state.regions[0] });
    } else {
      this.setState({ regionSelected: null });
    }
  }

  handleFocus(e) {
    let parent = e.target.parentElement;
    return parent.classList.contains("material-focus")
      ? parent.classList.remove("material-focus")
      : parent.classList.add("material-focus");
  }

  componentDidMount() {
    this.API_CALL("region", this.state.regions[0]);
  }

  API_CALL(type, place) {
    let uri = null;
    switch (type) {
      case "region":
        uri = `https://restcountries.eu/rest/v2/region/${place}?fields=name;capital;latlng;area`;
        break;
      case "region":
        uri = `https://restcountries.eu/rest/v2/name/${place}`;
        break;
      default:
        console.log("something went wrong");
    }

    let req = new Request(uri, {
      method: "GET",
      mode: "cors"
    });

    fetch(req)
      .then(resp => {
        return resp.json();
      })
      .then(resp => {
        this.setState({
          regionSelected: place,
          regionSelectedResults: resp
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="search-info">
        <span className="input-wrapper">
          <input
            type="text"
            name="search-text"
            className="input-search"
            value={this.state.value}
            onChange={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleFocus}
            placeholder="Type Country Name..."
          />
        </span>
        <RegionalBlock
          regionSelected={this.state.regionSelected}
          regions={this.state.regions}
          regionTrigger={this.regionTrigger}
        />
        <SearchResult
           regionSelectedResults={this.state.regionSelectedResults}
        />
      </div>
    );
  }
}
