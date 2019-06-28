import React, { Component } from "react";
import RegionalBlock from "./_RegionalBlock";
import SearchResult from "./_SearchResults";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
      regionSelected: "",
      results: []
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.regionTrigger = this.regionTrigger.bind(this);
  }

  regionTrigger(e) {
    console.log(e.target);
  }

  handleInput(e) {
    console.log(e.target.value);
  }

  handleFocus(e) {
    let parent = e.target.parentElement;
    return parent.classList.contains("material-focus")
      ? parent.classList.remove("material-focus")
      : parent.classList.add("material-focus");
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
          regions={this.state.regions}
          regionTrigger={this.regionTrigger}
        />
        <SearchResult
          currentRegtion={this.state.regionSelected}
          countries={this.state.results}
        />
      </div>
    );
  }
}
