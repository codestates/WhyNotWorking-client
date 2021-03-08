import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./AskPage.module.css";
import { Editor } from "../editor/Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { selectUserInfo } from "../signIn/signInSlice";
import { selectBody } from "../editor/editorSlice";
import axios from "axios";

export function AskPage() {
  const body = useSelector(selectBody);
  const userInfo = useSelector(selectUserInfo);
  const [list1, setList1] = useState<Boolean>(false);
  const [list2, setList2] = useState<Boolean>(false);
  const [list3, setList3] = useState<Boolean>(false);
  const [title, setTitle] = useState<string>("");

  const postReview = () => {
    if (userInfo != null) {
      const data = JSON.stringify({
        title,
        body,
        userId: userInfo.id,
      });
      axios({
        method: "post",
        url: "https://localhost:4000/posts/",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        Ask a public question
        <img src="https://i.imgur.com/jQDV6Ai.png" alt="타이틀 일러스트"></img>
      </div>
      <div className={styles.mainBox}>
        <div className={styles.writingBox}>
          <div className={styles.head}>Title</div>
          <p>
            Be specific and imagine you’re asking a question to another person
          </p>
          <input
            type="text"
            placeholder="e.g. Is there an R function or finding the index of an element in a vector"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <div className={styles.head}>Body</div>
          <p>
            Include all the information someone would need to answer your
            question
          </p>
          <Editor />
          <div className={styles.head}>Tags</div>
          <p>Add up to 5 tags to describe what your question is about</p>
          <input type="text" placeholder="e.g. (css spring java)"></input>
        </div>
        <div className={styles.sideBar}>
          <div className={styles.tutorial}>
            <div className={styles.tutorialHead}>Draft your question</div>
            <div className={styles.desc}>
              The community is here to help you with specific coding, algorithm,
              or language problems.
              <div>Avoid asking opinion-based questions.</div>
            </div>
            <div className={styles.listWrapper}>
              <div className={styles.list}>
                <img
                  src="https://cdn.sstatic.net/Img/list-1.svg?v=e8dd475ba207"
                  alt="1."
                />
                <div className={styles.wrapper}>
                  Summarize the problem
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faChevronDown}
                    onClick={() => {
                      console.log("click");
                      setList1(!list1);
                    }}
                  ></FontAwesomeIcon>
                </div>
              </div>
              {list1 ? (
                <ul>
                  <li>* Include details about your goal</li>
                  <li>* Describe expected and actual results</li>
                  <li>* Include any error messages</li>
                </ul>
              ) : (
                ""
              )}
            </div>
            <div className={styles.listWrapper}>
              <div className={styles.list}>
                <img
                  src="https://cdn.sstatic.net/Img/list-2.svg?v=9382fc2c3631"
                  alt="2."
                />
                <div className={styles.wrapper}>
                  Describe what you've tried
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faChevronDown}
                    onClick={() => {
                      console.log("click");
                      setList2(!list2);
                    }}
                  ></FontAwesomeIcon>
                </div>
              </div>
              {list2 ? (
                <ul>
                  <li>
                    Show what you’ve tried and tell us what you found (on this
                    site or elsewhere) and why it didn’t meet your needs. You
                    can get better answers when you provide research.
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
            <div className={styles.listWrapper}>
              <div className={styles.list}>
                <img
                  src="https://cdn.sstatic.net/Img/list-3.svg?v=323a95564232"
                  alt="3."
                />
                <div className={styles.wrapper}>
                  Show some code
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faChevronDown}
                    onClick={() => {
                      console.log("click");
                      setList3(!list3);
                    }}
                  ></FontAwesomeIcon>
                </div>
              </div>
              {list3 ? (
                <ul>
                  <li>
                    When appropriate, share the minimum amount of code others
                    need to reproduce your problem
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btnBox}>
        <div className={styles.btn} onClick={postReview}>
          Review your question
        </div>
      </div>
    </div>
  );
}
