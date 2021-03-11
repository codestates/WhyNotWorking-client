import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Activity.module.css";
import { UserInfo } from "../signIn/signInSlice";
import { PostInterface } from "../post/Post";
import { AnswerInfo } from "../mypage/MyPage";

export interface MenuProps {
  setCurPage: (page: string) => void;
  userInfo: UserInfo | null;
}

interface ActivityProps extends MenuProps {
  questions: PostInterface[] | [];
  answers: AnswerInfo[] | [];
}

export function Activity({
  setCurPage,
  userInfo,
  questions,
  answers,
}: ActivityProps) {
  useEffect(() => {
    setCurPage("activity");
  });
  return (
    <div className={styles.container}>
      <div className={styles.questionsBox}>
        <div className={styles.titleBox}>
          <div className={styles.title}>Questions</div>
          <div className={styles.count}>({questions.length})</div>
        </div>

        <div className={styles.postList}></div>
      </div>
      <div className={styles.answersBox}>
        <div className={styles.titleBox}>
          <div className={styles.title}>Answers</div>
          <div className={styles.count}>({answers.length})</div>
        </div>

        <div className={styles.postList}></div>
      </div>
    </div>
  );
}
