import React, { Component } from "react";

export default class _SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetter: props.resetVal,
      storedValue: "",
      actualValue: null
    };
    this.perfRequest = this.perfRequest.bind(this);
  }

  API_CALL(url) {
    let request = new Request(url, {
      method: "GET",
      mode: "cors"
    });

    fetch(request)
      .then(resp => resp.json())
      .then(resp =>
        this.setState({
          resetter: "hasValue",
          actualValue: resp,
          storedValue: resp
        })
      )
      .catch(err => console.log(err));
  }

  perfRequest(req) {
    let uri = null;
    if (req.val !== "") {
      switch (req.requestType) {
        case "region":
          console.log(req.val);
          uri = `https://restcountries.eu/rest/v2/region/${req.val}`;
          this.API_CALL(uri);
          break;
        case "input":
          console.log("was from input");
          break;
        default:
          console.log("something went wrong");
      }
    }
  }

  render() {
    return (
      <div className="search-results">
        {this.state.resetter === "none" &&
          this.perfRequest(this.props.valueToFetch)}
        {this.state.actualValue === null ? (
          <div className="loader" />
        ) : (
          console.log(this.state.actualValue)
        )}
      </div>
    );
  }
}


//// NEED TO MOVE FETCH REQUEST AT PARENT, CANNOT TRIGGER A RE RENDER , AS IT WILL RESULT TO INFINITE LOOP!,, BUT YOU CAN TRY AGAIN TOMORROW AND SEE IF YOU CAN DO ANY WORKAROUND!!! GOOD LUCK! ,, YOU CAN DO IT! :)
