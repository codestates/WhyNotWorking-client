import React from "react";
import logo from "./logo.svg";
import { Nav } from "./features/nav/Nav";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { closeNotification, selectNav } from "./features/nav/navSlice";

function App() {
  const notificationStatus = useSelector(selectNav);
  const dispatch = useDispatch();

  return (
    <div
      className="App"
      onClick={() => {
        if (notificationStatus.inbox || notificationStatus.achivement) {
          dispatch(closeNotification());
        }
      }}
    >
      <header className="header">
        <Nav></Nav>
      </header>
    </div>
  );
}

export default App;
