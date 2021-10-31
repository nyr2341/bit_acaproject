import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./index.css";
import Auth from "./layouts/Auth";
import App from "./layouts/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  // eslint-disable-next-line no-undef
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");

  window.FirebasePlugin.getToken(
    function (token) {
      // save this server-side and use it to push notifications to this device
      console.log("Token : " + token);
    },
    function (error) {
      console.error(error);
    }
  );
}

// 가장 상위의 js파일입니다.
const Result = () => {
  // 백에서 주는 토큰을 관리하기위한 Hook 사용
  const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);

  // 토큰의 유무로 layouts 폴더에 있는 두개의 js파일중 하나를 보여줍니다.
  if (cookies.Authorization === undefined) {
    return (
      <Switch>
        <Route path="/auth" render={() => <Auth setCookie={setCookie} />} />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route
          path="/main"
          render={() => <App cookies={cookies} removeCookie={removeCookie} />}
        />
        <Redirect from="/" to="/main/shoppinglist" />
      </Switch>
    );
  }
};

// 위에서 만든 Result 컴포넌트를 여기서 렌더링 합니다.
ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <Result />
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
