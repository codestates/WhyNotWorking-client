import React from "react";
import styles from "./Tag.module.css";
import { TagInfo } from "../tags/Tags";

export function Tag({ tagInfo }: { tagInfo: TagInfo }) {
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <div>{tagInfo.tagName}</div>
      </div>
      <div className={styles.description}>{tagInfo.detail}</div>
      {/* <div className={styles.infoBox}>
        <div>2179275 questions</div>
        <div>944 asked today, 5379 this week</div>
      </div> */}
    </div>
  );
}
