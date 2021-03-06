import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Page404 from "../Navigation/_page404";

//Dynamically loaded components
const Home = React.lazy(() => import("./_Home"));
const Search = React.lazy(() => import("./_SearchArea"));
const History = React.lazy(() => import("./_History"));

export default class Content extends Component {
  render() {
    return (
      <main className="content">
        <React.Suspense fallback={<div className="loader" />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/history" component={History} />
            <Route component={Page404} />
          </Switch>
        </React.Suspense>
      </main>
    );
  }
}
