import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import dotenv from "dotenv";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
axios.defaults.withCredentials = true;

if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: "./.env.development",
  });
}

axios.interceptors.response.use(
  function (response) {
    // Do something with response data

    console.log(response.data.accessToken);

    if (response.data.accessToken !== undefined) {
      localStorage.setItem("user", response.data.accessToken);
    }

    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
