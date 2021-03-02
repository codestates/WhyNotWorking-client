import React, { useState } from "react";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <div className={styles.container}>
      <ul className={styles.content}>
        <li className={`${styles.menu} ${styles.clicked}`}>Home</li>
        <ul className={styles.inner_menu}>
          <li className={styles.title}>PUBLIC</li>
          <li className={styles.menu}>Stack Overflow</li>
          <li className={styles.menu}>Tags</li>
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
