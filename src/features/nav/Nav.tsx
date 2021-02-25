import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faTrophy,
  faQuestionCircle,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <a href="#" className={styles.logo}></a>
      </div>
      <ul className={styles.product_container}>products</ul>
      <div className={styles.search_container}>
        <input type="text" className={styles.search} />
      </div>
      <ol className={styles.menu_container}>
        <li className={styles.menu_avatar}>
          <a href="#" className={styles.avatar}></a>
        </li>
        <li className={styles.menu_item}>
          <FontAwesomeIcon icon={faInbox}></FontAwesomeIcon>
        </li>
        <li className={styles.menu_item}>
          <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon>
        </li>
        <li className={styles.menu_item}>
          <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
        </li>
        <li className={styles.menu_item}>
          <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
        </li>
      </ol>
    </div>
  );
}
