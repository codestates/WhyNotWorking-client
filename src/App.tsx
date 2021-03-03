import React from "react";
import { Nav } from "./features/nav/Nav";
import { Sidebar } from "./features/sidebar/Sidebar";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { closeNotification, selectNav } from "./features/nav/navSlice";
import { QuestionList } from "./features/questionList/QuestionList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const notificationStatus = useSelector(selectNav);
  const dispatch = useDispatch();

  return (
    <Router>
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
            <div className="center_content">
              <Switch>
                <Route exact path="/tags">
                  <div className="temp">TAG</div>
                </Route>
                <Route exact path="/questions">
                  <QuestionList />
                </Route>
                <Route exact path="/">
                  <div className="temp">HOME</div>
                </Route>
                <Route path="*">
                  <div className="temp">404</div>
                </Route>
              </Switch>
            </div>
            <div className="right_sidebar"></div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
