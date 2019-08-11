import React, { Component } from 'react'
import Charts from './_charts';



class _graphResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: "",
      previewCharts: false,
      country: "",
    }
    this.API_REQUEST = this.API_REQUEST.bind(this)
    this.requestResults = this.requestResults.bind(this)

  }

  API_REQUEST() {
    let PROXY = "https://cors-anywhere.herokuapp.com/";
    let ENDPOINT = `https://api.darksky.net/forecast/744e7d6b0439574aaa1141614a80f683/${this.props.coords[0][0]},${this.props.coords[0][1]},${Math.floor(this.props.date.getTime() / 1000)}?exclude=flags,daily,currently`;

    const uri = PROXY + ENDPOINT;
    const timeRequest = new Request(uri, {
      method: "GET",
      mode: "cors"
    })

    fetch(timeRequest)
      .then(res => res.json())
      .then((res) => {
        if (res.hasOwnProperty('timezone')) {
          this.setState({ results: res.hourly.data, country: this.props.country, previewCharts: true });
        } else {
          //invalid time request
          console.log(res.error);
        }
      })
      .catch(err => console.log(err))
  }

  requestResults() {
    this.API_REQUEST();
    return <span className="loader" />
  }

  render() {
    let lookupAgain = false;
    if (this.state.country !== this.props.country) {
      lookupAgain = true;
    }
    return (
      <div>
        {this.props.coords.length > 0 && lookupAgain === true ? this.requestResults() : <Charts data={this.state.results} />}
      </div>
    )
  }
}

export default _graphResults
