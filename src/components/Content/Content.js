import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

//Dynamically loaded components
const Home = React.lazy(() => import("./_Home"));

export default class Content extends Component {
  render() {
    return (
      <main className="content">
        <Switch>
          <React.Suspense fallback={<div className="loader" />}>
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
          </React.Suspense>
        </Switch>
      </main>
    );
  }
}


