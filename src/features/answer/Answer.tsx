import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import { AnswerInterface, PostInterface } from "../post/Post";
import styles from "./Answer.module.css";
import avatar from "../../assets/images/avatar.jpg";
import { voteType } from "../questionDetail/QuestionDetail";
interface AnswerProps {
  answer: AnswerInterface;
  postVote: (type: voteType, obj: PostInterface | AnswerInterface) => void;
}

export function Answer({ answer, postVote }: AnswerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.postBox}>
        <div className={styles.recommendBox}>
          <div
            className={styles.upDown}
            onClick={() => {
              postVote(voteType.up, answer as AnswerInterface);
            }}
          >
            <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
          </div>
          <div className={styles.upDownNumber}>{answer?.votes}</div>
          <div
            className={styles.upDown}
            onClick={() => {
              postVote(voteType.down, answer as AnswerInterface);
            }}
          >
            <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
          </div>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.content}>
            <MDEditor.Markdown
              source={`${answer?.body}`}
              className={styles.preview}
            />
          </div>
          <div className={styles.tagsBox}>
            <ul className={styles.tags}>
              <li>amazon-ec2</li>
              <li>aws-codepipeline</li>
            </ul>
          </div>
          <div className={styles.contentUtilsBox}>
            <ul className={styles.editBox}>
              <li>Share</li>
              <li>Edit</li>
              <li>Follow</li>
            </ul>
            <div className={styles.userBox}>
              <img src={avatar} alt="userImage" className={styles.avatar} />
              <div className={styles.username}>{answer?.user.nickname}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
