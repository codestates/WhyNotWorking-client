import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./questionList.module.css";
import { Post } from "../post/Post";
import { faCaretDown, faCog } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../pagination/Pagination";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import axios from "axios";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function QuestionList() {
  let match = useRouteMatch();
  let query = useQuery();
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);

  const getPostbyPage = (page: number) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/posts?page=${page}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setPosts(response.data.data);
    });
  };

  useEffect(() => {
    const currentPage = (query.get("page") as unknown) as number;
    dispatch(setCurrentPage(match.path));

    getPostbyPage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.questionBox}>
        <div className={styles.header}>
          <div className={styles.titleBox}>
            <div>All Questions</div>
            <div>20,889,999 questions</div>
          </div>
          <div className={styles.filterBox}>
            <div className={styles.btnWrapper}>
              <div className={styles.btn}>Ask Question</div>
            </div>
            <div className={styles.filterWrapper}>
              <div className={styles.newest}>Newest</div>
              <div className={styles.active}>Active</div>
              <div className={styles.bountied}>Bountied</div>
              <div className={styles.unanswered}>Unanswered</div>
              <div className={styles.more}>
                More
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faCaretDown}
                ></FontAwesomeIcon>
              </div>

              <div className={styles.customFilter}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faCog}
                ></FontAwesomeIcon>
                Filter
              </div>
            </div>
          </div>
        </div>
        <div className={styles.postList}>
          {posts.map((v, i) => (
            <Post post={v} key={i} />
          ))}
          {/* <Post /> */}
        </div>
        <div className={styles.paginationBox}>
          <Pagination />
        </div>
      </div>
      <div className={styles.tagBox}></div>
    </div>
  );
}
