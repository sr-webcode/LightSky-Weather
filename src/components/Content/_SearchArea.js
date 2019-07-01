import React, { Component } from "react";
import RegionalBlock from "./_RegionalBlock";
import SearchResult from "./_SearchResults";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: "",
      currentRegion: "",
      resetVal: true,
      fetchResults: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.regionalBlockWasClicked = this.regionalBlockWasClicked.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.dataFetch = this.dataFetch.bind(this);
  }

  handleInput(e) {
    this.setState({
      textValue: e.target.value
    });
  }

  handleFocus(e) {
    let spanParent = e.target.parentElement;
    return spanParent.classList.contains("material-focus")
      ? spanParent.classList.remove("material-focus")
      : spanParent.classList.add("material-focus");
  }

  regionalBlockWasClicked(e) {
    const isString = typeof e === "string" ? true : false;
    this.setState({
      textValue: "",
      currentRegion: isString ? e : e.target.textContent,
      resetVal: true
    });
  }

  API_CALL(path) {
    let request = new Request(path, {
      method: "GET",
      mode: "cors"
    });
    fetch(request)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ resetVal: false, fetchResults: resp });
      })
      .catch(err => console.log(err));
  }

  dataFetch(res) {
    let uri = null;
    switch (res.type) {
      case "region":
        uri = `https://restcountries.eu/rest/v2/region/${res.val}`;
        this.API_CALL(uri);
        break;
      case "input":
        break;
    }
  }

  render() {
    return (
      <div className="search-info">
        <span className="input-wrapper">
          <input
            type="text"
            name="search-text"
            className="input-search"
            value={this.state.textValue}
            onChange={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleFocus}
            placeholder="Type Country Name..."
          />
        </span>
        <RegionalBlock
          textHasValue={this.state.textValue !== "" ? true : false}
          regionalBlockWasClicked={this.regionalBlockWasClicked}
        />
        <SearchResult
          dataFetchResult={this.state.fetchResults}
          dataFetch={this.dataFetch}
          resetVal={this.state.resetVal}
          valueToFetch={
            this.state.textValue === ""
              ? { val: this.state.currentRegion, type: "region" }
              : { val: this.state.textValue, type: "input" }
          }
        />
      </div>
    );
  }
}
