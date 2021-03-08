import React from "react";
import { Link } from "react-router-dom";
import styles from "./post.module.css";

interface PostProps {
  post: PostInterface;
}

export interface UserInterface {
  nickname: string;
  image: string;
}

export interface AnswerInterface {
  body: string;
  choose: boolean;
  user: UserInterface;
  votes: number;
}

export interface PostInterface {
  answers: Array<AnswerInterface>;
  body: string;
  createdAt: string;
  id: string;
  postTag: Array<any>;
  title: string;
  updatedAt: string;
  user: UserInterface;
  userId: string;
  views: number;
  votes: number;
}

export function Post({ post }: PostProps) {
  return (
    <div className={styles.container}>
      <div className={styles.countBox}>
        <div className={styles.votes}>
          <div className={styles.count}>
            <span>{post.votes}</span>
          </div>
          <div>votes</div>
        </div>
        <div className={styles.answer}>
          {/*unanswered,answered,answered-accepted */}
          <div className={styles.count}>
            <span>{post.answers.length}</span>
          </div>
          <div>answer</div>
        </div>
        <div className={styles.views}>
          <div className={styles.count}>
            <span>{post.views}</span>
          </div>
          <div>views</div>
          {/* hot */}
        </div>
      </div>
      <div className={styles.summaryBox}>
        <div className={styles.title}>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.tagBox}>
            <a
              href="https://stackoverflow.com/questions/tagged/android"
              className={styles.tag}
              title=""
              rel="tag"
            >
              android
            </a>
            <a
              href="https://stackoverflow.com/questions/tagged/webview"
              className={styles.tag}
              title=""
              rel="tag"
            >
              webview
            </a>
            <a
              href="https://stackoverflow.com/questions/tagged/crash"
              className={styles.tag}
              title=""
              rel="tag"
            >
              crash
            </a>
          </div>
          <div className={styles.infoBox}>
            <div>asked{/* modified */} 1 min ago</div>
            <a href="https://stackoverflow.com/users/15279516/soripk">
              {post.user.nickname}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
