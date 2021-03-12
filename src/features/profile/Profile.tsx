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
import styles from "./Profile.module.css";
import { MenuProps } from "../activity/Activity";
import { selectUserInfo } from "../signIn/signInSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Post, PostInterface } from "../post/Post";
import { AnswerInfo } from "../mypage/MyPage";
import { PostSummary } from "../postSummary/PostSummary";

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
  const history = useHistory();
  const myInfo = useSelector(selectUserInfo);
  const [userId, setUserId] = useState<number | null>(
    userInfo ? userInfo.id : null
  );
  const [nickName, setNickName] = useState<string | null>(
    userInfo ? userInfo.nickname : null
  );
  const [location, setLocation] = useState<string | null>(
    userInfo ? userInfo.location : null
  );
  const [image, setImage] = useState<string | undefined>(
    userInfo ? userInfo.image : undefined
  );
  const [aboutMe, setAboutMe] = useState<string | undefined>(
    userInfo ? userInfo.aboutMe : undefined
  );
  const [sortedPosts, setSortedPosts] = useState<NewPost[] | null>(null);
  const getSortedPosts = () => {
    const qPosts: NewPost[] = questions.map((q) => ({
      vote: q.votes,
      title: q.title,
      id: q.id,
      createdAt: q.createdAt,
    }));

    const aPosts: NewPost[] = answers.map((a) => ({
      vote: a.vote,
      title: a.title,
      id: a.postId,
      createdAt: a.createdAt,
    }));
    const totalPosts: any = qPosts.concat(aPosts);
    const sorted = totalPosts.sort((a: NewPost, b: NewPost) => {
      if (a.vote < b.vote) return -1;
    });
    setSortedPosts(sorted);
  };

  useEffect(() => {
    setCurPage("profile");
    getSortedPosts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headInfo}>
        <div className={styles.imgBox}>
          <img className={styles.img} src={image} alt="profile picture" />
        </div>
        <div className={styles.introductionBox}>
          <div className={styles.name}>{nickName}</div>
          {aboutMe ? (
            <div className={styles.aboutMe}>{aboutMe}</div>
          ) : myInfo ? (
            userId === myInfo.id ? (
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
              {location}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.summaryBox}>
        <div className={styles.summaryTitle}>
          Top posts<p className={styles.postsCount}>({aCount + qCount})</p>
        </div>
        <div className={styles.postList}>
          <div className={styles.postSummary}>
            {sortedPosts
              ? sortedPosts.map((p: NewPost, i) => {
                  if (p) {
                    <PostSummary
                      key={i}
                      vote={p.vote}
                      title={p.title}
                      createdAt={p.createdAt}
                    />;
                  }
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
