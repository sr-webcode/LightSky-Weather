import "../sass/style.scss";
import React, { Component } from "react";
import { render as Show } from "react-dom";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
const app = document.querySelector("#app");

/** Components */
import "./Utils/FontAwesome";
import Navigation from "./Navigation/Navigation";
import MobileOverlay from "./Overlays/MobileOverlay";
import Content from "./Content/Content";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayStatus: {
        active: false,
        className: ""
      }
    };
    this.toggleOverlay = this.toggleOverlay.bind(this);
  }

  toggleOverlay() {
    this.setState(prevState => {
      return {
        overlayStatus: {
          active: !prevState.overlayStatus.active,
          className: this.state.overlayStatus.className === "open" ? "" : "open"
        }
      };
    });
  }

  render() {
    return (
      <Router>
        <MobileOverlay
          btnClose={this.toggleOverlay}
          showStatus={this.state.overlayStatus.className}
        />
        <Navigation burgerClick={this.toggleOverlay} />
        <Content />
        <Redirect to="/home" />
      </Router>
    );
  }
}

Show(<Main />, app);
