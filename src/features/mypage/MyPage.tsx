import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useRouteMatch,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MyPage.module.css";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import { Profile } from "../profile/Profile";
import { Activity } from "../activity/Activity";
import { Setting } from "../setting/Setting";
import { UserInfo, selectUserInfo } from "../signIn/signInSlice";
import axios from "axios";
import { PostInterface } from "../post/Post";

export interface AnswerInfo {
  postId: number;
  userId: number;
  body: string;
  votes: number;
  choose: Boolean;
  createdAt: string;
  updatedAt: string;
  post: { title: string };
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function MyPage() {
  const match = useRouteMatch();
  const myInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const { userId } = useParams<{ userId: string }>();
  const [questions, setQuestions] = useState<PostInterface[] | []>([]);
  const [answers, setAnswers] = useState<AnswerInfo[] | []>([]);
  const [qCount, setQcount] = useState(0);
  const [aCount, setAcount] = useState(0);
  const [curPage, setCurPage] = useState("profile");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const query = useQuery();
  const [route, setRoute] = useState("profile");

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
        setUserInfo(res.data.data);
      });
  };

  useEffect(() => {
    let currentPage = (query.get("page") as unknown) as string;
    setRoute(currentPage);
    dispatch(setCurrentPage("/users"));
    getQuestions();
    getAnswers();
    getUserInfoById();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.menuBox}>
        <Link to={`${match.url}?page=profile`}>
          <div
            className={`${styles.menu} ${
              curPage === "profile" ? styles.selected : ""
            }`}
            onClick={() => setRoute("profile")}
          >
            Profile
          </div>
        </Link>
        <Link to={`${match.url}?page=activity`}>
          <div
            className={`${styles.menu} ${
              curPage === "activity" ? styles.selected : ""
            }`}
            onClick={() => setRoute("activity")}
          >
            Activity
          </div>
        </Link>
        {myInfo ? (
          Number(userId) === myInfo.id ? (
            <Link to={`${match.url}?page=setting`}>
              <div
                className={`${styles.menu} ${
                  curPage === "setting" ? styles.selected : ""
                }`}
                onClick={() => setRoute("setting")}
              >
                Edit profile
              </div>
            </Link>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
      <div>
        {route !== "setting" ? (
          route !== "activity" ? (
            <Profile
              userId={userId}
              questions={questions}
              setCurPage={setCurPage}
              answers={answers}
              userInfo={userInfo ? userInfo : myInfo}
            />
          ) : (
            <Activity
              userInfo={userInfo}
              setCurPage={setCurPage}
              questions={questions}
              answers={answers}
            />
          )
        ) : (
          <Setting setCurPage={setCurPage} userId={userId} />
        )}
      </div>
    </div>
  );
}
