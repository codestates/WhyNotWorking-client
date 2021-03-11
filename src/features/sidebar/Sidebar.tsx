import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSidebar } from "./sidebarSlice";
import React from "react";
import styles from "./Sidebar.module.css";

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
          <Link to="/questions?page=1">
            <li
              className={`${styles.menu} ${
                currentPage === "/questions" ? styles.clicked : ""
              }`}
            >
              Queue Overflow
            </li>
          </Link>
          <Link to="/tags">
            <li
              className={`${styles.menu} ${
                currentPage === "/tags" ? styles.clicked : ""
              }`}
            >
              Tags
            </li>
          </Link>
          <Link to="/users">
            <li
              className={`${styles.menu} ${
                currentPage === "/users" ? styles.clicked : ""
              }`}
            >
              Users
            </li>
          </Link>
        </ul>
        <ul className={styles.inner_menu}>
          <li className={styles.title}>FIND A JOB</li>
          <li className={styles.menu}>Jobs 🚧</li>
          <li className={styles.menu}>Companies 🚧</li>
        </ul>
      </ul>
    </div>
  );
}
