import React, { Component } from "react";

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="search-results">
        {this.props.countries.length < 1   && <div className="loader" />}
      </div>
    );
  }
}
