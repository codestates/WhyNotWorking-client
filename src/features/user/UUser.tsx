import React from "react";
import styles from "./User.module.css";

export function User() {
  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        <img src="https://i.imgur.com/pG0fYRq.png" alt="프로필사진"></img>
      </div>
      <div className={styles.infoBox}>
        <div className={styles.name}>User Name</div>
        <div className={styles.info}>
          <div className={styles.region}>Seoul, South Korea</div>
          <div className={styles.createdDate}>one day</div>
        </div>
        <div className={styles.tags}>
          <div className={styles.tag}>javascript</div>,
          <div className={styles.tag}>react</div>
          {",  "}
          <div className={styles.tag}>css</div>
        </div>
      </div>
    </div>
  );
}
