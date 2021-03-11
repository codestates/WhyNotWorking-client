import React, { useEffect } from "react";
import { Nav } from "./features/nav/Nav";
import { Sidebar } from "./features/sidebar/Sidebar";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { closeNotification, selectNav } from "./features/nav/navSlice";
import { QuestionList } from "./features/questionList/QuestionList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { login, UserInfo } from "./features/signIn/signInSlice";
import { SignIn } from "./features/signIn/SignIn";
import { QuestionDetail } from "./features/questionDetail/QuestionDetail";
import { Tags } from "./features/tags/Tags";
import { Users } from "./features/users/UsersPage";
import { Home } from "./features/home/Home";
import { SignUp } from "./features/signUp/SignUp";
import { AskPage } from "./features/askPage/AskPage";
import { SignUpDetail } from "./features/signUpDetail/SignUpDetail";
import { MyPage } from "./features/mypage/MyPage";

function App() {
  const notificationStatus = useSelector(selectNav);
  const dispatch = useDispatch();

  useEffect(() => {
    let loggedInUser = (localStorage.getItem("user") as unknown) as string;

    if (loggedInUser) {
      // console.log(Object.keys(i));
      // console.log(Object.values(i));
      dispatch(login(JSON.parse(loggedInUser)));
    }
  });

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
                  <Sidebar />
                </div>
                <div className="center_content">
                  <Users />
                </div>
              </div>
            </Route>
            <Route path="/post/:postId">
              <div className="main_content">
                <div className="left_content">
                  <Sidebar />
                </div>
                <div className="center_content">
                  <QuestionDetail />
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
            <Route path="/questions">
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
            <Route exact path="/signup">
              <SignUp />
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
                  <Home />
                </div>
              </div>
            </Route>
            <Route exact path="/askPage">
              <AskPage />
            </Route>
            <Route exact path="/signupDetail">
              <SignUpDetail />
            </Route>
            <Route exact path="/users/:userId">
              <div className="main_content">
                <div className="left_content">
                  <Sidebar />
                </div>
                <div className="center_content">
                  <MyPage />
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
