import React from "react";
import logo from "./logo.svg";
import { Nav } from "./features/nav/Nav";
import { Sidebar } from "./features/sidebar/Sidebar";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { closeNotification, selectNav } from "./features/nav/navSlice";
import { QuestionList } from "./features/questionList/QuestionList";

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
      <main className="main">
        <div className="main_content">
          <Sidebar></Sidebar>
          <QuestionList></QuestionList>
          <div className="right_sidebar"></div>
        </div>
      </main>
    </div>
  );
}

export default App;
