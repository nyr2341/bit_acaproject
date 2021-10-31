import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import routes from "../routesAuth.js";

const Auth = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        background: "#e9ecef",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Switch>
        {routes.map((prop, key) => {
          if (prop.layout === "/auth") {
            return (
              <Route
                path={prop.layout + prop.path}
                render={() => <prop.component setCookie={props.setCookie} />}
                key={key}
              />
            );
          }
          return null;
        })}
        <Redirect from="/auth" to="/auth/login" />
      </Switch>
    </div>
  );
};

export default Auth;
