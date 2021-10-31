import React from "react";
import Navbar from "../components/Navbar/Navbar";
import routes from "../routes.js";

import { Switch, Route, Redirect } from "react-router-dom";

const App = (props) => {
  return (
    <div style={{ height: "100%" }}>
      <Navbar
        routes={routes}
        logout={(key1, key2) => {
          props.removeCookie(key1, key2);
        }}
        cookies={props.cookies}
      />
      <Switch>
        {routes.map((prop, key) => {
          if (prop.layout === "/main") {
            return (
              <Route
                path={prop.layout + prop.path}
                render={() => <prop.component cookies={props.cookies} />}
                key={key}
              />
            );
          }
          return null;
        })}
        <Redirect from="/main" to="/main/shoppinglist" />
      </Switch>
    </div>
  );
};

export default App;
