import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export function Sidebar() {
  let match = useRouteMatch();

  console.log(match);

  return (
    <div className={styles.container}>
      <ul className={styles.content}>
        <Link to="/">
          <li className={`${styles.menu} ${styles.clicked}`}>HOME</li>
        </Link>
        <ul className={styles.inner_menu}>
          <li className={styles.title}>PUBLIC</li>
          <Link to="/questions">
            <li className={styles.menu}>Stack Overflow</li>
          </Link>
          <Link to="/tags">
            <li className={styles.menu}>Tags</li>
          </Link>
          <li className={styles.menu}>Users</li>
        </ul>
        <ul className={styles.inner_menu}>
          <li className={styles.title}>FIND A JOB</li>
          <li className={styles.menu}>Jobs</li>
          <li className={styles.menu}>Companies</li>
        </ul>
      </ul>
    </div>
  );
}
