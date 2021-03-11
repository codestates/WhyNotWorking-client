import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./AskPage.module.css";
import { Editor } from "../editor/Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { selectIsLogin, selectUserInfo } from "../signIn/signInSlice";
import axios from "axios";
import { useHistory } from "react-router-dom";

export function AskPage() {
  const userInfo = useSelector(selectUserInfo);
  const isLogin = useSelector(selectIsLogin);
  const [list1, setList1] = useState(false);
  const [list2, setList2] = useState(false);
  const [list3, setList3] = useState(false);
  const [title, setTitle] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [body, setBody] = useState<string | undefined>("");
  const history = useHistory();
  const [tags, setTags] = useState<Array<string>>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const postReview = () => {
    if (userInfo !== null) {
      const data = JSON.stringify({
        title,
        body,
        userId: userInfo.id,
        tags,
      });

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_HOST}/posts`,
        headers: {
          "Content-Type": "application/json",
        },
        data,
      })
        .then(() => {
          history.push("/questions?page=1");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const tagCloseHandler = (index: number) => {
    setTags(tags.filter((v, i) => i !== index));
    inputRef.current?.focus();
  };

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          Ask a public question
          <img
            src="https://i.imgur.com/jQDV6Ai.png"
            alt="타이틀 일러스트"
          ></img>
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
              className={styles.input}
            ></input>
            <div className={styles.head}>Body</div>
            <p>
              Include all the information someone would need to answer your
              question
            </p>
            <Editor setValue={setBody} value={body} />
            <div className={styles.head}>Tags</div>
            <p>Add up to 5 tags to describe what your question is about</p>
            <div className={styles.tagBox}>
              <input
                type="text"
                placeholder={
                  tags.length === 0 && tagValue === ""
                    ? "e.g. (css spring java)"
                    : ""
                }
              ></input>
              <div className={styles.tagWrapBox}>
                {tags.map((v, i) => (
                  <div
                    className={styles.tagStyle}
                    key={i}
                    onClick={() => {
                      tagCloseHandler(i);
                    }}
                  >
                    {v}
                    <div className={styles.tagClose}>x</div>
                  </div>
                ))}
                <input
                  type="text"
                  className={styles.hiddenInput}
                  value={tagValue}
                  ref={inputRef}
                  onKeyUp={(e) => {
                    if (e.key === " ") {
                      setTags([...tags, tagValue.split(" ")[0]]);
                      setTagValue("");
                    }
                  }}
                  onChange={(e) => {
                    setTagValue(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.sideBar}>
            <div className={styles.tutorial}>
              <div className={styles.tutorialHead}>Draft your question</div>
              <div className={styles.desc}>
                The community is here to help you with specific coding,
                algorithm, or language problems.
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
    </div>
  );
}
