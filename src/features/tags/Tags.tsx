import React from "react";

import { Pagination } from "../pagination/Pagination";
import { Tag } from "../tag/Tag";
import styles from "./Tags.module.css";

export function Tags() {
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
        <input placeholder="&#xf002; Filter by tag name"></input>
        <div className={styles.filterBox}>
          <div className={styles.popular}>Popular</div>
          <div className={styles.name}>Name</div>
          <div className={styles.new}>New</div>
        </div>
      </div>
      <div className={styles.listBox}>
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
      </div>
      <div className={styles.paginationBox}>
        <Pagination />
      </div>
    </div>
  );
}
