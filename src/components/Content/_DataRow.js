import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WeatherReport from "./_weatherReport";

class _DataRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasClicked: false,
      payLoad: null
    };
    this.sniffHeight = this.sniffHeight.bind(this);
    this.wasClickedTrack = this.wasClickedTrack.bind(this);
  }

  sniffHeight(e) {
    let whatHeight = e.currentTarget.offsetHeight;
    let arrow = e.currentTarget.firstElementChild;
    if (whatHeight === 44) {
      let scrollHt = e.currentTarget.scrollHeight;
      e.currentTarget.style.setProperty("height", scrollHt + "px");
      arrow.style.setProperty("transform", "rotateX(180deg)");
      this.setState({ wasClicked: true });
    } else {
      e.currentTarget.style.setProperty("height", "44px");
      arrow.style.setProperty("transform", "unset");
    }
  }

  wasClickedTrack(data) {

    this.setState({
      wasClicked: false,
      payLoad: data,
    });
  }

  render() {
    const { latlng } = this.props.data;
    return (
      <div
        className="search-row"
        onClick={this.sniffHeight}
        style={{ height: "44px" }}
      >
        <FontAwesomeIcon icon="sort-down" />
        {this.props.data.name}
        <WeatherReport
          wasClicked={this.state.wasClicked}
          coords={latlng}
          track={this.wasClickedTrack}
          payLoad={this.state.payLoad}
        />
      </div>
    );
  }
}

export default _DataRow;
