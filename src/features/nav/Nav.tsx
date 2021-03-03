import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faTrophy,
  faQuestionCircle,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { openNotification, selectNav } from "./navSlice";
import styles from "./Nav.module.css";
import { Notification } from "../notification/Notification";

export function Nav() {
  const notificationStatus = useSelector(selectNav);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <span className={styles.logo}></span>
      </div>
      <ul className={styles.product_container}>Products</ul>
      <div className={styles.search_container}>
        <input type="text" className={styles.search} />
      </div>
      <ol className={styles.menu_container}>
        <li className={styles.menu_avatar}>
          <span className={styles.avatar}></span>
        </li>
        <li
          className={styles.menu_item}
          onClick={() => {
            dispatch(openNotification("inbox"));
          }}
        >
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faInbox}></FontAwesomeIcon>
          </div>
          {notificationStatus.inbox ? (
            <Notification title={"Inbox"}></Notification>
          ) : (
            ""
          )}
        </li>
        <li
          className={styles.menu_item}
          onClick={() => {
            dispatch(openNotification("achivement"));
          }}
        >
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon>
          </div>
          {notificationStatus.achivement ? (
            <Notification title={"Achivement"}></Notification>
          ) : (
            ""
          )}
        </li>
        <li className={styles.menu_item}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
          </div>
        </li>
        <li className={styles.menu_item}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
          </div>
        </li>
      </ol>
    </div>
  );
}
