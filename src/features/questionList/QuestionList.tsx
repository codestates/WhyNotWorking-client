import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./questionList.module.css";
import { Post } from "../post/Post";
import { faCaretDown, faCog } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getCountAsync, getPostsAsync, selectCount } from "./qLSlice";

import { useLocation, useRouteMatch } from "react-router-dom";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import axios from "axios";
import { Link } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function QuestionList() {
  let match = useRouteMatch();
  let query = useQuery();
  const dispatch = useDispatch();
  // const count = useSelector(selectCount);
  const [postCount, setPostCount] = useState<number>();
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

  const getCount = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/posts/count`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setPostCount(response.data.data[0].count);
    });
  };

  useEffect(() => {
    const currentPage = (query.get("page") as unknown) as number;
    dispatch(setCurrentPage(match.path));

    getPostbyPage(currentPage);
    getCount();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, match]);

  return (
    <div className={styles.container}>
      <div className={styles.questionBox}>
        <div className={styles.header}>
          <div className={styles.titleBox}>
            <div>All Questions</div>
            <div>{postCount} questions</div>
          </div>
          <div className={styles.filterBox}>
            <div className={styles.btnWrapper}>
              <Link to="/askPage">
                <div className={styles.btn}>Ask Question</div>
              </Link>
            </div>

            {/* <div className={styles.filterWrapper}>
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
            </div> */}
          </div>
        </div>
        <div className={styles.postList}>
          {posts.map((v, i) => (
            <Post post={v} key={i} />
          ))}
        </div>
        <div className={styles.paginationBox}>
          <Pagination count={postCount} path={"questions"} />
        </div>
      </div>
      <div className={styles.tagBox}></div>
    </div>
  );
}
