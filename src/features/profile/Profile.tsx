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
import styles from "./Profile.module.css";
import { MenuProps } from "../activity/Activity";
import { UserInfo, selectUserInfo } from "../signIn/signInSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Post, PostInterface } from "../post/Post";
import { AnswerInfo } from "../mypage/MyPage";
import { PostSummary } from "../postSummary/PostSummary";
import axios from "axios";

interface ProfileProps extends MenuProps {
  aCount: number;
  qCount: number;
  questions: PostInterface[];
  answers: AnswerInfo[];
}
export interface NewPost {
  vote: number;
  title: string;
  id: number;
  createdAt: string;
}

export function Profile({
  setCurPage,
  userInfo,
  aCount,
  qCount,
  questions,
  answers,
}: ProfileProps) {
  const match = useRouteMatch();
  const { userId } = useParams<{ userId: string }>();
  const myInfo = useSelector(selectUserInfo);
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [sortedPosts, setSortedPosts] = useState<NewPost[] | null>(null);

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
    });
    setSortedPosts(sorted);
  };

  const getUserInfoById = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/users?user_id=${userId}`)
      .then((res) => {
        setUserData(res.data.data);
      });
  };
  useEffect(() => {
    console.log("hi");
    setCurPage("profile");
    getUserInfoById();
    getSortedPosts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headInfo}>
        <div className={styles.imgBox}>
          <img
            className={styles.img}
            src={userData ? userData.image : ""}
            alt="profile"
          />
        </div>
        <div className={styles.introductionBox}>
          <div className={styles.name}>{userData ? userData.nickname : ""}</div>
          {userData ? (
            userData.aboutMe ? (
              <div className={styles.aboutMe}>{userData.aboutMe}</div>
            ) : myInfo ? (
              userData.id === myInfo.id ? (
                <>
                  <div className={styles.noneAboutMe}>
                    Your about me is currently blank.
                  </div>
                  <Link to={`${match.url}/setting`}>
                    <div className={styles.settingLink}>Click here to edit</div>
                  </Link>
                </>
              ) : (
                <div className={styles.noneAboutMe}>
                  Apparently, this user prefers to keep an air of mystery about
                  them.
                </div>
              )
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        <div className={styles.sideInfoBox}>
          <div className={styles.countInfo}>
            <div className={styles.answersCountBox}>
              <div className={styles.count}>{aCount}</div>
              <div className={styles.title}>answers</div>
            </div>
            <div className={styles.questionsCountBox}>
              <div className={styles.count}>{qCount}</div>
              <div className={styles.title}>questions</div>
            </div>
          </div>
          <div className={styles.sideInfo}>
            <div className={styles.location}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className={styles.icon}
              ></FontAwesomeIcon>
              {userData ? userData.location : ""}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.summaryBox}>
        <div className={styles.summaryTitle}>
          Top posts<p className={styles.postsCount}>({aCount + qCount})</p>
        </div>
        <div className={styles.postList}>
          {sortedPosts
            ? sortedPosts.map((p: NewPost, i) => {
                if (p) {
                  return (
                    <PostSummary
                      key={i}
                      vote={p.vote}
                      title={p.title}
                      createdAt={p.createdAt}
                    />
                  );
                }
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
