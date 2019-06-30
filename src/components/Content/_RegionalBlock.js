import React, { Component } from "react";

export default class _RegionalBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
      selected: null,
      details: null
    };
    this.toggleRegion = this.toggleRegion.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  toggleRegion(e) {
    this.setState({ selected: e.target.textContent });
    this.props.regionalBlockWasClicked(e);
  }

  isSelected(value) {
    if (!this.props.textHasValue) {
      return value !== this.state.selected ? "region" : "region selected";
    } else {
      return "region";
    }
  }

  componentDidMount() {
    this.setState({ selected: this.state.regions[0] });
    //call props for initial render
    this.props.regionalBlockWasClicked(this.state.regions[0])
  }

  render() {
    return (
      <div className="search-regional">
        {this.state.regions.map(each => {
          return (
            <span
              className={this.isSelected(each)}
              key={uniqueGen(each)}
              onClick={this.toggleRegion}
            >
              {each}
            </span>
          );
        })}
      </div>
    );
  }
}

function uniqueGen(country, latlng = "UNQ") {
  let unique = country
    .split("")
    .map(letter => {
      return letter !== " " ? letter : "_";
    })
    .concat(latlng)
    .reverse()
    .sort((a, b) => {
      return b - a;
    })
    .join("");
  return unique;
}
