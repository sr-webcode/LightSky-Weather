import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Navigation extends Component {
  render() {
    return (
      <Fragment>       
        <nav className="weather-navigation-menu">
          <span className="burger" onClick={this.props.burgerClick}>
            <div />
            <div />
            <div />
          </span>

          <h2>
            LightSky <FontAwesomeIcon icon="cloud-sun" />
          </h2>

        </nav>
        
      </Fragment>
    );
  }
}
