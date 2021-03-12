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
        <li
          className={`${styles.menu} ${
            currentPage === "/" ? styles.clicked : ""
          }`}
        >
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>

        <li className={styles.inner_menu}>
          <ul>
            <li className={styles.title}>PUBLIC</li>
            <li
              className={`${styles.menu} ${
                currentPage === "/questions" ? styles.clicked : ""
              }`}
            >
              <Link to="/questions?page=1" className={styles.link}>
                Queue Overflow
              </Link>
            </li>
            <li
              className={`${styles.menu} ${
                currentPage === "/tags" ? styles.clicked : ""
              }`}
            >
              <Link to="/tags?page=1" className={styles.link}>
                Tags
              </Link>
            </li>

            <li
              className={`${styles.menu} ${
                currentPage === "/users" ? styles.clicked : ""
              }`}
            >
              <Link to="/users?page=1" className={styles.link}>
                Users
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.inner_menu}>
          <ul>
            <li className={styles.title}>FIND A JOB</li>
            <li className={styles.menu}>Jobs 🚧</li>
            <li className={styles.menu}>Companies 🚧</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
