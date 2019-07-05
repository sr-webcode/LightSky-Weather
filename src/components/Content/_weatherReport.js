import React, { Component, Fragment } from "react";

class _weatherReport extends Component {
  constructor(props) {
    super(props);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.dataExtract = this.dataExtract.bind(this);
  }

  fetchWeather(coords) {
    //do the fetch now
    const [lat, lng] = coords;
    let key = "744e7d6b0439574aaa1141614a80f683";
    let uri = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${lng}`;
    let request = new Request(uri, {
      method: "GET",
      mode: "cors"
    });

    fetch(request)
      .then(res => res.json())
      .then(res => {
        this.props.track(res);
      })
      .catch(err => console.log(err));
    return <div className="loader" />;
  }

  dataExtract(info) {
    if (info !== null) {
      const { apparentTemperature, icon, summary, windSpeed } = info.currently;
    return (<Fragment>
        <div className="search-row-desc-image">{icon}</div>
        <div className="search-row-desc-text">
        <h2>{apparentTemperature}</h2>  
        <p>{summary}</p>
        <p>{windSpeed}</p>        
        </div>
        </Fragment>)
    }
  }

  render() {
    return (
      <div className="search-row-desc">
        {this.props.wasClicked === true
          ? this.fetchWeather(this.props.coords)
          : this.dataExtract(this.props.payLoad)}
      </div>
    );
  }
}

export default _weatherReport;
