import React, { useEffect, useState } from "react";
import { Editor } from "../editor/Editor";
import styles from "./QuestionDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import MDEditor from "@uiw/react-md-editor";
import avatar from "../../assets/images/avatar.jpg";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { PostInterface } from "../post/Post";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import { useDispatch } from "react-redux";
import { Answer } from "../answer/Answer";

export function QuestionDetail() {
  let { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostInterface>();
  const [value, setValue] = useState<string | undefined>("");
  const history = useHistory();
  const dispatch = useDispatch();

  const getPost = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/posts?post_id=${postId}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setPost(response.data.data[0]);
      })
      .catch(() => {
        history.push("/");
      });
  };

  const postAnswer = () => {
    const data = {
      postId: post?.id,
      userId: post?.userId,
      body: value,
    };

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_HOST}/answers`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((response) => {
        console.log(response);
        getPost();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(setCurrentPage("/questions"));

    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.titleBox}>{post?.title}</div>
          <div className={styles.askBox}>
            <button className={styles.askButton}>Ask Question</button>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <ul>
            <li>
              <span>Asked</span>
              <span>today</span>
            </li>
            <li>
              <span>Active</span>
              <span>today</span>
            </li>
            <li>
              <span>Viewed</span>
              <span>{post?.views} times</span>
            </li>
          </ul>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainLeft}>
          <div className={styles.postBox}>
            <div className={styles.recommendBox}>
              <div className={styles.upDown}>
                <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
              </div>
              <div className={styles.upDownNumber}>{post?.votes}</div>
              <div className={styles.upDown}>
                <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
              </div>
            </div>
            <div className={styles.contentBox}>
              <div className={styles.content}>
                <MDEditor.Markdown
                  source={`${post?.body}`}
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
                  <div className={styles.username}>{post?.user.nickname}</div>
                </div>
              </div>
            </div>
          </div>
          {post?.answers.map((v, i) => (
            <Answer answer={v} key={i} />
          ))}
          <div className={styles.editorBox}>
            <Editor setValue={setValue} value={value} />
          </div>
          <div className={styles.postButtonBox}>
            <button className={styles.postButton} onClick={postAnswer}>
              Post Your Answer
            </button>
          </div>
        </div>
        <div className={styles.mainRight}></div>
      </main>
    </div>
  );
}
