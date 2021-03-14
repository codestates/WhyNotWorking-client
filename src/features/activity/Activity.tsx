import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Activity.module.css";
import { UserInfo } from "../signIn/signInSlice";
import { PostInterface } from "../post/Post";
import { AnswerInfo } from "../mypage/MyPage";
import { PostSummary } from "../postSummary/PostSummary";

export interface MenuProps {
  setCurPage: (page: string) => void;
  userInfo?: UserInfo | null;
}

interface ActivityProps extends MenuProps {
  questions: PostInterface[];
  answers: AnswerInfo[];
}

export function Activity({
  setCurPage,
  userInfo,
  questions,
  answers,
}: ActivityProps) {
  const history = useHistory();
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

        <div className={styles.postList}>
          {questions.map((p, i) => (
            <Link key={i} to={`/post/${p.id}`}>
              <PostSummary
                vote={p.votes}
                title={p.title}
                createdAt={p.createdAt}
              ></PostSummary>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.answersBox}>
        <div className={styles.titleBox}>
          <div className={styles.title}>Answers</div>
          <div className={styles.count}>({answers.length})</div>
        </div>

        <div className={styles.postList}>
          {answers.map((p, i) => (
            <Link key={i} to={`/post/${p.postId}`}>
              <PostSummary
                vote={p.votes}
                title={p.post.title}
                createdAt={p.createdAt}
              ></PostSummary>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
