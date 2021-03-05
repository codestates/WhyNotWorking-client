import React from "react";
import { Nav } from "./features/nav/Nav";
import { Sidebar } from "./features/sidebar/Sidebar";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { closeNotification, selectNav } from "./features/nav/navSlice";
import { QuestionList } from "./features/questionList/QuestionList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { TopQuestion } from "./features/topQuestions/TopQuestion";
import { Editor } from "./features/editor/Editor";
import { QuestionDetail } from "./features/questionDetail/QuestionDetail";

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
            <div className="left_content">
              <Sidebar></Sidebar>
            </div>
            <div className="center_content">
              <Switch>
                <Route exact path="/tags">
                  <div className="temp">TAG</div>
                </Route>
                <Route exact path="/questions">
                  <QuestionList />
                </Route>
                <Route exact path="/">
                  <QuestionDetail />
                </Route>
                <Route path="*">
                  <div className="temp">404</div>
                </Route>
              </Switch>
            </div>
            <Switch>
              <Route exact path="/questions">
                <div className="right_sidebar"></div>
              </Route>
              <Route exact path="/">
                {/* <div className="right_sidebar"></div> */}
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
