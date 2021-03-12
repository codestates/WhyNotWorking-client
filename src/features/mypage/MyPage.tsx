import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MyPage.module.css";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import { Profile } from "../profile/Profile";
import { Activity } from "../activity/Activity";
import { Setting } from "../setting/Setting";
import { UserInfo } from "../signIn/signInSlice";
import axios from "axios";
import { PostInterface } from "../post/Post";

export interface AnswerInfo {
  postId: number;
  userId: number;
  body: string;
  vote: number;
  choose: Boolean;
  createdAt: string;
  updatedAt: string;
  title: string;
}

export function MyPage() {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const { userId } = useParams<{ userId: string }>();
  const [questions, setQuestions] = useState<PostInterface[] | []>([]);
  const [answers, setAnswers] = useState<AnswerInfo[] | []>([]);
  const [qCount, setQcount] = useState(0);
  const [aCount, setAcount] = useState(0);
  const [curPage, setCurPage] = useState("profile");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [myId, setMyId] = useState<number | null>(3);

  const getQuestions = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/posts?user_id=${userId}`)
      .then((res) => {
        setQuestions(res.data.data);
        setQcount(res.data.data.length);
      });
  };

  const getAnswers = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/answers?user_id=${userId}`)
      .then((res) => {
        setAnswers(res.data.data);
        setAcount(res.data.data.length);
      });
  };

  const getUserInfoById = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/users?user_id=${userId}`)
      .then((res) => {
        // setUserInfo(res.data.data);
        // setMyId(res.data.data.id);
      });
  };

  useEffect(() => {
    // dispatch(setCurrentPage("/users"));
    // getQuestions();
    // getAnswers();
    // getUserInfoById();
  }, []);

  return (
    <Router>
      <div className={styles.container}>
        <div className={styles.menuBox}>
          <Link to={`${match.url}`}>
            <div
              className={`${styles.menu} ${
                curPage === "profile" ? styles.selected : ""
              }`}
            >
              Profile
            </div>
          </Link>
          <Link to={`${match.url}/activity`}>
            <div
              className={`${styles.menu} ${
                curPage === "activity" ? styles.selected : ""
              }`}
            >
              Activity
            </div>
          </Link>
          {Number(userId) === myId ? (
            <Link to={`${match.url}/setting`}>
              <div
                className={`${styles.menu} ${
                  curPage === "setting" ? styles.selected : ""
                }`}
              >
                Edit profile
              </div>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div>
          <Switch>
            <Route exact path={`${match.path}`}>
              <Profile
                userInfo={userInfo}
                setCurPage={setCurPage}
                aCount={aCount}
                qCount={qCount}
                questions={questions}
                answers={answers}
              />
            </Route>
            <Route exact path={`${match.path}/activity`}>
              <Activity
                userInfo={userInfo}
                setCurPage={setCurPage}
                questions={questions}
                answers={answers}
              />
            </Route>
            <Route exact path={`${match.path}/setting`}>
              <Setting userInfo={userInfo} setCurPage={setCurPage} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
