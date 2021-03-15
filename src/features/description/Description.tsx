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
        return "https://moviebara.s3.ap-northeast-2.amazonaws.com/webp/webp1.webp";
      case "b":
        return "https://moviebara.s3.ap-northeast-2.amazonaws.com/webp/webp2.webp";
      case "c":
        return "https://moviebara.s3.ap-northeast-2.amazonaws.com/webp/webp3.webp";
      case "d":
        return "https://moviebara.s3.ap-northeast-2.amazonaws.com/webp/webp4.webp";
      case "e":
        return "https://moviebara.s3.ap-northeast-2.amazonaws.com/webp/webp5.webp";
      case "f":
        return "https://moviebara.s3.ap-northeast-2.amazonaws.com/webp/webp6.webp";
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuBox}>
        <div className={styles.rocket}></div>
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
        <div className={styles.astro}></div>
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
