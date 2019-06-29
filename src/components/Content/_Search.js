import React, { Component } from "react";
import RegionalBlock from "./_RegionalBlock";
import SearchResult from "./_SearchResults";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
      regionSelected: null,  
      regionDetails: null,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.regionTrigger = this.regionTrigger.bind(this);
  }

  regionTrigger(e) {
    this.setState({ regionSelected: e.target.textContent });
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
    this.setState({ regionSelected: this.state.regions[0] });
  }
    
  API_CALL(region){
    let uri=`https://restcountries.eu/rest/v2/region/${region}`;
    let req = new Request(uri,{
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "Content-type": "application/json",
        })
    })
    
    fetch(req)
        .then((resp)=>{
          return resp.json();
        })
    
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
          currentRegion={this.state.regionSelected} 
        />
      </div>
    );
  }
}


