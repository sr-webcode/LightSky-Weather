import React, { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textVal: null
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
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
            placeholder="Country or City Name.."
          />
        </span>
      </div>
    );
  }
}
