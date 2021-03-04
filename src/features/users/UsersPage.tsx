import React from "react";

import { Pagination } from "../pagination/Pagination";
import styles from "./Users.module.css";
import { User } from "../user/UUser";

export function Users() {
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>Users</div>

      <div className={styles.controllBox}>
        <link
          href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
          rel="stylesheet"
        ></link>
        <input placeholder="&#xf002; Filter by user"></input>
        <div className={styles.filterBox}>
          <div className={styles.popular}>New users</div>
          <div className={styles.name}>questions</div>
          <div className={styles.new}>answers</div>
        </div>
      </div>
      <div className={styles.listBox}>
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </div>
      <div className={styles.paginationBox}>
        <Pagination />
      </div>
    </div>
  );
}
