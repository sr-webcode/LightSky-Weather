import React, { Component } from "react";

export class _miniCountryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: [...props.orgList]
    };
    this.extractList = this.extractList.bind(this);
  }

  ResultHighlight(name, reference) {
    const startPoint = name.toLowerCase().indexOf(reference.toLowerCase());
    const endPoint = startPoint + reference.length - 1;
    const values = name
      .split("")
      .map((each, index) => {
        if (index >= startPoint && index <= endPoint) {
          return `<span class='text-highlight'>${each}</span>`;
        }
        return each;
      })
      .join("");

    return {
      __html: `${values}`
    };
  }

  indexer(items, index) {
    const { name, latlng } = items;
    return name + latlng[0] + latlng[1] + index;
  }

  extractList() {
    return this.state.currentList.map((country, index) => {
      if (
        country.name
          .toLowerCase()
          .indexOf(this.props.filterVal.toLowerCase()) != -1
      ) {
        return (
          <li
            key={this.indexer(country, index)}
            dangerouslySetInnerHTML={this.ResultHighlight(
              country.name,
              this.props.filterVal
            )}
          />
        );
      }
    });
  }

  render() {
    return <ul className="miniCountryList">{this.extractList()}</ul>;
  }
}

export default _miniCountryList;
