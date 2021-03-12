import styles from "./QuestionDetail.module.css";
import avatar from "../../assets/images/avatar.jpg";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { PostInterface, AnswerInterface } from "../post/Post";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Answer } from "../answer/Answer";
import { Editor } from "../editor/Editor";
import { selectUserInfo } from "../signIn/signInSlice";
import { currentPost } from "../askPage/askSlice";

export enum voteType {
  up,
  down,
}

export function QuestionDetail() {
  let { postId } = useParams<{ postId: string }>();
  const userInfo = useSelector(selectUserInfo);
  const [post, setPost] = useState<PostInterface>();
  const [value, setValue] = useState<string | undefined>("");
  const history = useHistory();
  const dispatch = useDispatch();

  const postView = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/posts/viewsUp`,
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        id: postId,
      },
    })
      .then(() => {
        getPost();
      })
      .catch(() => {});
  };

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
        dispatch(currentPost(response.data.data[0]));
      })
      .catch(() => {
        history.push("/");
      });
  };

  const postAnswer = () => {
    const data = {
      postId: post?.id,
      userId: userInfo?.id,
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
      .then(() => {
        getPost();
        setValue("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = () => {
    const data = {
      id: post?.id,
    };

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_SERVER_HOST}/posts`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then(() => {
        history.push("/questions?page=1");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAnswer = (id: number) => {
    const data = {
      id,
    };

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_SERVER_HOST}/answers`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then(() => {
        getPost();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isPost = (obj: PostInterface | AnswerInterface) => {
    return (obj as PostInterface).views !== undefined;
  };

  const postVote = (type: voteType, obj: PostInterface | AnswerInterface) => {
    const data: { id?: number; votes?: number } = {};

    data.id = obj.id;
    data.votes = obj.votes + 1;

    let url = `${process.env.REACT_APP_SERVER_HOST}/`;

    if (isPost(obj)) {
      url += `posts/`;
    } else {
      url += `answers/`;
    }

    if (type === voteType.up) {
      url += `votesUp`;
    } else if (type === voteType.down) {
      url += `votesDown`;
    }

    axios({
      method: "get",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        id: obj.id,
      },
    })
      .then(() => {
        getPost();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    dispatch(setCurrentPage("/questions"));
    postView();
    getPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  // useEffect(() => {}, [postId]);

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
              <div
                className={styles.upDown}
                onClick={() => {
                  postVote(voteType.up, post as PostInterface);
                }}
              >
                <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
              </div>
              <div className={styles.upDownNumber}>{post?.votes}</div>
              <div
                className={styles.upDown}
                onClick={() => {
                  postVote(voteType.down, post as PostInterface);
                }}
              >
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
                  {post?.postTag.map((v, i) => (
                    <li key={i}>{v.tag.tagName}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.contentUtilsBox}>
                <ul className={styles.editBox}>
                  <li>Share</li>
                  <Link to={`edit/${postId}`}>
                    <li>Edit</li>
                  </Link>
                  <li
                    onClick={() => {
                      deletePost();
                    }}
                  >
                    Delete
                  </li>
                </ul>
                <div className={styles.userBox}>
                  <img src={avatar} alt="userImage" className={styles.avatar} />
                  <div className={styles.username}>{post?.user.nickname}</div>
                </div>
              </div>
            </div>
          </div>
          {post?.answer.map((v, i) => (
            <Answer
              answer={v}
              key={i}
              postVote={postVote}
              deleteAnswer={deleteAnswer}
            />
          ))}
          <div className={styles.editorBox}>
            <MDEditor onChange={setValue} value={value} preview="edit" />
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
