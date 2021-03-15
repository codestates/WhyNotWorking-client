import React from "react";
import { Link } from "react-router-dom";
import styles from "./post.module.css";
import TimeAgo from "javascript-time-ago";

interface PostProps {
  post: PostInterface;
}

export interface UserInterface {
  id: number;
  nickname: string;
  image: string;
}

export interface AnswerInterface {
  kind: "answerInterface";
  id: number;
  postId: number;
  body: string;
  choose: boolean;
  user: UserInterface;
  votes: number;
}

export interface PostInterface {
  kind: "postInterface";
  answer: Array<AnswerInterface>;
  body: string;
  createdAt: string;
  id: number;
  postTag: Array<any>;
  title: string;
  updatedAt: string;
  user: UserInterface;
  userId: number;
  views: number;
  votes: number;
}

export function Post({ post }: PostProps) {
  const timeAgo = new TimeAgo("en-US");

  // console.log(post.answer.filter((v) => v.choose).length);

  return (
    <div className={styles.container}>
      <div className={styles.countBox}>
        <div className={styles.votes}>
          <div className={styles.count}>
            <span>{post.votes}</span>
          </div>
          <div>votes</div>
        </div>
        <div
          className={
            post.answer.filter((v) => v.choose).length === 1
              ? styles.choosed
              : ""
          }
        >
          {/*unanswered,answered,answered-accepted */}
          <div className={styles.count}>
            <span>{post.answer.length}</span>
          </div>
          <div>answer</div>
        </div>
        <div className={styles.views}>
          <div className={styles.count}>
            <span>{post.views}</span>
          </div>
          <div>views</div>
        </div>
      </div>
      <div className={styles.summaryBox}>
        <div className={styles.title}>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.tagBox}>
            {post?.postTag.map((v, i) => (
              <div key={i} className={styles.tag}>
                {v.tag.tagName}
              </div>
            ))}
          </div>
          <div className={styles.infoBox}>
            <div>
              asked{" "}
              {post?.createdAt ? timeAgo.format(new Date(post?.createdAt)) : ""}
            </div>
            <Link to={`/users/${post.user.id}`}>{post.user.nickname}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
