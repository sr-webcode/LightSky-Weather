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
      fetchResults: "",

    };
    this.handleInput = this.handleInput.bind(this);
    this.regionalBlockWasClicked = this.regionalBlockWasClicked.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.dataFetch = this.dataFetch.bind(this);
    this.typeTimeout = null;
  }

  handleInput(e) {
    clearTimeout(this.typeTimeout);
    let inputText = e.target.value;
    this.typeTimeout = setTimeout(() => {
      this.setState({ textValue: inputText, resetVal: true });
    }, 500);
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

  API_CALL(path, viaInput) {
    let request = new Request(path, {
      method: "GET",
      mode: "cors"
    });
    fetch(request)
      .then(resp => resp.json())
      .then(resp => {
        if (viaInput) {
          if (resp.status === 404) {
            return this.setState({
              resetVal: false,
              fetchResults: "the search returned no results...",
      
            });
          }

          let finalval = resp.filter(each => {
            return (
              each.name
                .toLowerCase()
                .indexOf(this.state.textValue.toLowerCase()) != -1
            );
          });

          return this.setState({
            resetVal: false,
            fetchResults:
              finalval.length > 0
                ? finalval
                : "the search returned no results...",
         
          });
        }

        this.setState({ resetVal: false, fetchResults: resp });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          resetVal: false,
          fetchResults: "something went wrong, please refresh your browser"
        });
      });
  }

  dataFetch(res) {
    let uri = null;
    switch (res.type) {
      case "region":
        uri = `https://restcountries.eu/rest/v2/region/${res.val}`;
        this.API_CALL(uri);
        break;
      case "input":
        uri = `https://restcountries.eu/rest/v2/name/${res.val}`;
        this.API_CALL(uri, true);
        break;
      default:
        console.log("something went teoo");
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
            // value={this.state.textValue}
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
          
          inputBoxValue={this.state.textValue}
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
