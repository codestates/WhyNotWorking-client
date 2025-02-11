import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { PostInterface } from "./features/post/Post";

TimeAgo.addDefaultLocale(en);
axios.defaults.withCredentials = true;

if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: "./.env.development",
  });
}

axios.interceptors.response.use(
  function (response) {
    if (response.data.accessToken !== undefined) {
      localStorage.setItem("user", response.data.accessToken);
    }

    return response;
  },
  function (error: AxiosError) {
    if (error.response?.data.message === "auth error") {
      window.location.href = `${process.env.REACT_APP_CLIENT_HOST}/signup`;
      localStorage.clear();
    } else if (error.response?.data.message === "Such email already exists") {
      alert("중복된 이메일입니다.");
    } else if (
      error.response?.data.message === "Such nickname already exists"
    ) {
      alert("중복된 닉네임입니다.");
    }
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

// interface myPorps {
//   data: PostInterface;
// }

// axios
//   .get(`${process.env.REACT_APP_SERVER_HOST}`)
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// axios
//   .get(`${process.env.REACT_APP_SERVER_HOST}`)
//   .then(({ data }: myPorps) => {
//     console.log(data.title);
//   })
//   .catch((err: AxiosError) => {
//     console.log(err);
//   });
