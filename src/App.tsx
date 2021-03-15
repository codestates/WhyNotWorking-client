import React, { useEffect } from "react";
import { Nav } from "./features/nav/Nav";
import { Sidebar } from "./features/sidebar/Sidebar";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { closeNotification, selectNav } from "./features/nav/navSlice";
import { QuestionList } from "./features/questionList/QuestionList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SignIn } from "./features/signIn/SignIn";
import { QuestionDetail } from "./features/questionDetail/QuestionDetail";
import { Tags } from "./features/tags/Tags";
import { Users } from "./features/users/UsersPage";
import { Home } from "./features/home/Home";
import { SignUp } from "./features/signUp/SignUp";
import { AskPage } from "./features/askPage/AskPage";
import { SignUpDetail } from "./features/signUpDetail/SignUpDetail";
import { Footer } from "./features/footer/Footer";
import { MyPage } from "./features/mypage/MyPage";
import { login } from "./features/signIn/signInSlice";
import axios from "axios";

function App() {
  const notificationStatus = useSelector(selectNav);
  const dispatch = useDispatch();

  const stayLogin = (token: string) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/users/myinfo`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((usersResponse) => {
        dispatch(login(usersResponse.data.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      stayLogin(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Route exact path="/post/edit/:postId">
              <AskPage />
            </Route>
            <Route exact path="/post/:postId">
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
                <div className="right_sidebar">
                  <div className="right_title">Frontend Developers</div>
                  <div className="right_name">이동현</div>
                  <div className="right_name">김예슬</div>
                  <div className="right_title">Backend Developers</div>
                  <div className="right_name">김유영</div>
                  <div className="right_name">강성호</div>
                </div>
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
                  <Sidebar />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
