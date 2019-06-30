import React, { Component } from "react";
import RegionalBlock from "./_RegionalBlock";
import SearchResult from "./_SearchResults";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: "",
      currentRegion: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.regionalBlockWasClicked = this.regionalBlockWasClicked.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
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
      currentRegion: isString ? e : e.target.textContent
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
         resetVal="none"
          valueToFetch={
            this.state.textValue === ""
              ? { val: this.state.currentRegion, requestType: "region" }
              : { val: this.state.textValue, requestType: "input" }
          }
        />
      </div>
    );
  }
}
