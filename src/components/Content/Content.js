import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

//Dynamically loaded components
const Home = React.lazy(() => import("./_Home"));
const Search = React.lazy(() => import("./_Search"));

export default class Content extends Component {
  render() {
    return (
      <main className="content">
        <React.Suspense fallback={<div className="loader" />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route
              render={() => {
                return <h1>Component not found!</h1>;
              }}
            />
          </Switch>
        </React.Suspense>
      </main>
    );
  }
}
