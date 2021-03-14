import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch, useLocation } from "react-router-dom";

import { Pagination } from "../pagination/Pagination";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import { Tag } from "../tag/Tag";
import styles from "./Tags.module.css";
import axios from "axios";

export interface TagInfo {
  id: number;
  tagName: string;
  detail: string;
  postCount: number;
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function Tags() {
  let match = useRouteMatch();
  let query = useQuery();
  const dispatch = useDispatch();
  const [tags, setTags] = useState<TagInfo[]>([]);
  const [count, setCount] = useState<number>();

  const getTagsByPage = (page: number) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/tags?page=${page}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.data.data);

      setTags(res.data.data);
    });
  };

  const getTagsCount = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/tags/count`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setCount(res.data.data[0].count);
    });
  };

  useEffect(() => {
    const currentPage = (query.get("page") as unknown) as number;
    dispatch(setCurrentPage(match.path));
    getTagsByPage(currentPage);
    getTagsCount();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>Tags</div>
      <div className={styles.descriptionBox}>
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using the right tags makes it easier for others to
        find and answer your question.
      </div>
      <div className={styles.controllBox}>
        <link
          href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
          rel="stylesheet"
        ></link>
        <input
          className={styles.input}
          placeholder="&#xf002; Filter by tag name"
        ></input>
        <div className={styles.filterBox}>
          {/* <div className={styles.popular}>Popular</div>
          <div className={styles.name}>Name</div>
          <div className={styles.new}>New</div> */}
        </div>
      </div>
      <div className={styles.listBox}>
        {tags.map((v, i) => (
          <Tag tagInfo={v} key={i} />
        ))}
      </div>
      <div className={styles.paginationBox}>
        <Pagination count={count} path={"tags"} />
      </div>
    </div>
  );
}
