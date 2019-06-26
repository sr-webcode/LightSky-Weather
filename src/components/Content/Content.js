import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

//Sub Components
import Home from "./_Home";

export default class Content extends Component {
  render() {
    return (
      <main className="content">
        <Switch>
          <Route path="/home" component={Home} />
          <Route
            path="/search"
            component={() => {
              return <h1>HI search!</h1>;
            }}
          />
          <Route
            path="/history"
            component={() => {
              return <h1>HI history!</h1>;
            }}
          />
          <Route
            path="/settings"
            component={() => {
              return <h1>HI settings!</h1>;
            }}
          />
        </Switch>
      </main>
    );
  }
}
