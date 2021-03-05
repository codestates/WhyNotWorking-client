import React from "react";
import { Nav } from "./features/nav/Nav";
import { Sidebar } from "./features/sidebar/Sidebar";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { closeNotification, selectNav } from "./features/nav/navSlice";
import { QuestionList } from "./features/questionList/QuestionList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { selectUserInfo } from "./features/signIn/signInSlice";
import { SignIn } from "./features/signIn/SignIn";
import { QuestionDetail } from "./features/questionDetail/QuestionDetail";
import { Tags } from "./features/tags/Tags";
import { Users } from "./features/users/UsersPage";

function App() {
  const notificationStatus = useSelector(selectNav);
  const userInfo = useSelector(selectUserInfo);
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
          <Switch>
            <Route exact path="/users">
              <div className="main_content">
                <div className="left_content">
                  <Sidebar></Sidebar>
                </div>
                <div className="center_content">
                  <Users />
                </div>
              </div>
            </Route>
            <Route exact path="/tags">
              <div className="main_content">
                <div className="left_content">
                  <Sidebar></Sidebar>
                </div>
                <div className="center_content">
                  <Tags />
                </div>
              </div>
            </Route>
            <Route exact path="/questions">
              <div className="main_content">
                <div className="left_content">
                  <Sidebar></Sidebar>
                </div>
                <div className="center_content">
                  <QuestionList />
                </div>
                <div className="right_sidebar"></div>
              </div>
            </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/">
              <div className="main_content">
                <div className="left_content">
                  <Sidebar></Sidebar>
                </div>
                <div className="center_content">
                  <QuestionDetail />
                </div>
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
