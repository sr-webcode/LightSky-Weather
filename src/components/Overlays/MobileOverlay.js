import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class MobileOverlay extends Component {
  render() {
    return (
      <div className={`MobileOverlay ${this.props.showStatus}`}>
        <nav className="mobile-menu">
          <ul>
            <li>
              <Link to="/" onClick={this.props.btnClose}>
                <FontAwesomeIcon icon="home" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/search" onClick={this.props.btnClose}>
                <FontAwesomeIcon icon="search" />
                Search
              </Link>
            </li>
            <li>
              <Link to="" onClick={this.props.btnClose}>
                <FontAwesomeIcon icon="history" />
                History
              </Link>
            </li>
            <li>
              <span onClick={this.props.btnClose}>
                <FontAwesomeIcon icon="window-close" />
                Close
              </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
