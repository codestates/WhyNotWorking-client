import React from "react";

import styles from "./post.module.css";

export function Post() {
  return (
    <div className={styles.container}>
      <div className={styles.countBox}>
        <div className={styles.votes}>
          <div className={styles.count}>
            <span>0</span>
          </div>
          <div>votes</div>
        </div>
        <div className={styles.answer}>
          {/*unanswered,answered,answered-accepted */}
          <div className={styles.count}>
            <span>0</span>
          </div>
          <div>answer</div>
        </div>
        <div className={styles.views}>
          <div className={styles.count}>
            <span>0</span>
          </div>
          <div>views</div>
          {/* hot */}
        </div>
      </div>
      <div className={styles.summaryBox}>
        <div className={styles.title}>
          <a href="https://stackoverflow.com/questions/66361472/app-crashed-with-base-apklibmonochrome-so">
            App crashed with base.apk!libmonochrome.so
          </a>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.tagBox}>
            <a
              href="https://stackoverflow.com/questions/tagged/android"
              className={styles.tag}
              title=""
              rel="tag"
            >
              android
            </a>
            <a
              href="https://stackoverflow.com/questions/tagged/webview"
              className={styles.tag}
              title=""
              rel="tag"
            >
              webview
            </a>
            <a
              href="https://stackoverflow.com/questions/tagged/crash"
              className={styles.tag}
              title=""
              rel="tag"
            >
              crash
            </a>
          </div>
          <div className={styles.infoBox}>
            <div>asked{/* modified */} 1 min ago</div>
            <a href="https://stackoverflow.com/users/15279516/soripk">
              userName
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
