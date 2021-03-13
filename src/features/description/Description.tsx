import React, { useState } from "react";
import styles from "./Description.module.css";

export function Description() {
  const [clicked, setClicked] = useState("a");
  return (
    <div className={styles.container}>
      <div className={styles.menuBox}>
        <div
          className={`${styles.wrapper} ${
            clicked === "a" ? styles.selected : ""
          }`}
        >
          <div className={styles.menu} onClick={() => setClicked("a")}>
            A
          </div>
          <div className={`${styles.arrow} ${styles.a}`}></div>
        </div>
        <div
          className={`${styles.wrapper} ${
            clicked === "b" ? styles.selected : ""
          }`}
        >
          <div className={styles.menu} onClick={() => setClicked("b")}>
            B
          </div>
          <div className={`${styles.arrow} ${styles.b}`}></div>
        </div>
        <div
          className={`${styles.wrapper} ${
            clicked === "c" ? styles.selected : ""
          }`}
        >
          <div className={styles.menu} onClick={() => setClicked("c")}>
            C
          </div>
          <div className={`${styles.arrow} ${styles.c}`}></div>
        </div>
      </div>
      <div className={styles.main}>{clicked}</div>
      <div className={styles.menuBox}>
        <div
          className={`${styles.wrapper} ${
            clicked === "d" ? styles.selected : ""
          }`}
        >
          <div className={styles.menu} onClick={() => setClicked("d")}>
            D
          </div>
          <div className={`${styles.arrow} ${styles.d}`}></div>
        </div>
        <div
          className={`${styles.wrapper} ${
            clicked === "e" ? styles.selected : ""
          }`}
        >
          <div className={styles.menu} onClick={() => setClicked("e")}>
            E
          </div>
          <div className={`${styles.arrow} ${styles.e}`}></div>
        </div>
        <div
          className={`${styles.wrapper} ${
            clicked === "f" ? styles.selected : ""
          }`}
        >
          <div className={styles.menu} onClick={() => setClicked("f")}>
            F
          </div>
          <div className={`${styles.arrow} ${styles.f}`}></div>
        </div>
      </div>
    </div>
  );
}
