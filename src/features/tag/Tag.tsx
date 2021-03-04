import React from "react";
import styles from "./Tag.module.css";

export function Tag() {
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <div>JavaScript</div>
      </div>
      <div className={styles.description}>
        For questions regarding programming in ECMAScript (JavaScript/JS) and
        its various dialects/implementations (excluding ActionScript). Please
        include all relevant tags on your question; e.g., [node.js], [jquery],
        [json], etc.
      </div>
      <div className={styles.infoBox}>
        <div>2179275 questions</div>
        <div>944 asked today, 5379 this week</div>
      </div>
    </div>
  );
}
