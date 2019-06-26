import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from "constants";

//Dynamically loaded components
const Home = React.lazy(() => import("./_Home"));

export default class Content extends Component {
  render() {
    return (
      <main className="content">
        <Switch>
          <React.Suspense fallback={<p>page loading yeahh!</p>}>
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
