import React, { useState, useEffect } from "react";
import {
  useRouteMatch,
  Link,
  useParams,
  RouteComponentProps,
} from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Profile.module.css";
import { MenuProps } from "../activity/Activity";
import { UserInfo, selectUserInfo } from "../signIn/signInSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { PostInterface } from "../post/Post";
import { AnswerInfo } from "../mypage/MyPage";
import { PostSummary } from "../postSummary/PostSummary";
import axios from "axios";

interface ProfileProps extends MenuProps {
  questions: PostInterface[];
  answers: AnswerInfo[];
  userId: string;
}
export interface NewPost {
  vote: number;
  title: string;
  id: number;
  createdAt: string;
}

export function Profile({
  questions,
  answers,
  userInfo,
  setCurPage,
}: ProfileProps) {
  const getSortedPosts = () => {
    const qPosts: NewPost[] = questions.map((q) => ({
      vote: q.votes,
      title: q.title,
      id: q.id,
      createdAt: q.createdAt,
    }));

    const aPosts: NewPost[] = answers.map((a) => ({
      vote: a.votes,
      title: a.post.title,
      id: a.postId,
      createdAt: a.createdAt,
    }));
    const totalPosts: any = qPosts.concat(aPosts);
    const sorted = totalPosts.sort((a: NewPost, b: NewPost) => {
      if (a.vote < b.vote) return -1;
      return 1;
    });

    return sorted;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurPage("profile");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headInfo}>
        <div className={styles.imgBox}>
          <img className={styles.img} src={userInfo?.image} alt="profile" />
        </div>
        <div className={styles.introductionBox}>
          <div className={styles.name}>{userInfo?.nickname}</div>
          <div className={styles.aboutMe}>{userInfo?.aboutMe}</div>
        </div>
        <div className={styles.sideInfoBox}>
          <div className={styles.countInfo}>
            <div className={styles.answersCountBox}>
              <div className={styles.count}>{answers.length}</div>
              <div className={styles.title}>answers</div>
            </div>
            <div className={styles.questionsCountBox}>
              <div className={styles.count}>{questions.length}</div>
              <div className={styles.title}>questions</div>
            </div>
          </div>
          <div className={styles.sideInfo}>
            <div className={styles.location}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className={styles.icon}
              ></FontAwesomeIcon>
              {userInfo?.location}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.summaryBox}>
        <div className={styles.summaryTitle}>
          Top posts
          <p className={styles.postsCount}>
            ({questions.length + answers.length})
          </p>
        </div>
        <div className={styles.postList}>
          {getSortedPosts().map(
            (
              v: { vote: number; title: string; createdAt: string },
              i: React.Key | null | undefined
            ) => (
              <PostSummary
                key={i}
                vote={v.vote}
                title={v.title}
                createdAt={v.createdAt}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
