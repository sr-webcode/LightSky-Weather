import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Page404 from "../Navigation/_Page404";

//Dynamically loaded components
const Home = React.lazy(() => import("./_Home"));
const Search = React.lazy(() => import("./_SearchArea"));

export default class Content extends Component {
  render() {
    return (
      <main className="content">
        <React.Suspense fallback={<div className="loader" />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route component={Page404} />
          </Switch>
        </React.Suspense>
      </main>
    );
  }
}
