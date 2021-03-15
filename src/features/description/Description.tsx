import React, { useState } from "react";
import styles from "./Description.module.css";
import image1 from "../../assets/images/webp1.webp";
import image2 from "../../assets/images/webp2.webp";
import image3 from "../../assets/images/webp3.webp";
import image4 from "../../assets/images/webp4.webp";
import image5 from "../../assets/images/webp5.webp";
import image6 from "../../assets/images/webp6.webp";

export function Description() {
  const [clicked, setClicked] = useState("a");

  const imageSwitch = () => {
    switch (clicked) {
      case "a":
        return image1;
      case "b":
        return image2;
      case "c":
        return image3;
      case "d":
        return image4;
      case "e":
        return image5;
      case "f":
        return image6;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuBox}>
        <div
          className={`${styles.wrapper} ${
            clicked === "a" ? styles.selected : ""
          }`}
        >
          <div className={styles.menu} onClick={() => setClicked("a")}>
            Ask a question
          </div>
          <div className={`${styles.arrow} ${styles.a}`}></div>
        </div>
        <div
          className={`${styles.wrapper} ${
            clicked === "b" ? styles.selected : ""
          }`}
        >
          <div className={styles.menu} onClick={() => setClicked("b")}>
            Vote on everything
          </div>
          <div className={`${styles.arrow} ${styles.b}`}></div>
        </div>
        <div
          className={`${styles.wrapper} ${
            clicked === "c" ? styles.selected : ""
          }`}
        >
          <div className={styles.menu} onClick={() => setClicked("c")}>
            Answer questions
          </div>
          <div className={`${styles.arrow} ${styles.c}`}></div>
        </div>
      </div>
      <div className={styles.main}>
        <img src={imageSwitch()} alt="움짤" className={styles.webp} />
      </div>
      <div className={styles.menuBox}>
        <div
          className={`${styles.wrapper} ${
            clicked === "d" ? styles.selected : ""
          }`}
        >
          <div className={styles.menu} onClick={() => setClicked("d")}>
            Tag your questions
          </div>
          <div className={`${styles.arrow} ${styles.d}`}></div>
        </div>
        <div
          className={`${styles.wrapper} ${
            clicked === "e" ? styles.selected : ""
          }`}
        >
          <div className={styles.menu} onClick={() => setClicked("e")}>
            Accept an answer
          </div>
          <div className={`${styles.arrow} ${styles.e}`}></div>
        </div>
        <div
          className={`${styles.wrapper} ${
            clicked === "f" ? styles.selected : ""
          }`}
        >
          <div className={styles.menu} onClick={() => setClicked("f")}>
            Search questions
          </div>
          <div className={`${styles.arrow} ${styles.f}`}></div>
        </div>
      </div>
    </div>
  );
}
