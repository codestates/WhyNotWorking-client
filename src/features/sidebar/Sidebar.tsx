import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectSidebar } from "./sidebarSlice";
import React from "react";

export function Sidebar() {
  const currentPage = useSelector(selectSidebar);

  return (
    <div className={styles.container}>
      <ul className={styles.content}>
        <Link to="/">
          <li
            className={`${styles.menu} ${
              currentPage === "/" ? styles.clicked : ""
            }`}
          >
            Home
          </li>
        </Link>
        <ul className={styles.inner_menu}>
          <li className={styles.title}>PUBLIC</li>
          <Link to="/questions">
            <li
              className={`${styles.menu} ${
                currentPage === "/questions" ? styles.clicked : ""
              }`}
            >
              Stack Overflow
            </li>
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
