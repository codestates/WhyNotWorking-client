import {
  faInbox,
  faTrophy,
  faQuestionCircle,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openNotification, selectNav } from "../nav/navSlice";
import styles from "./NavMenu.module.css";
import { Notification } from "../notification/Notification";
import { selectIsLogin, selectUserInfo } from "../signIn/signInSlice";
import { Link } from "react-router-dom";

export function NavMenu() {
  const notificationStatus = useSelector(selectNav);
  const isLogin = useSelector(selectIsLogin);
  const userInfo = useSelector(selectUserInfo);
  const [userId, setUserId] = useState<number | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) setUserId(userInfo.id);
  }, [userInfo]);

  return (
    <div className={styles.container}>
      {isLogin ? (
        <ol className={styles.menu_container}>
          <li className={styles.menu_avatar}>
            <Link to={`/users/${userId}`} className={styles.avatarLink}>
              <span className={styles.avatar} title={"avatar image"}></span>
            </Link>
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
      ) : (
        <div className={styles.loginMenu}>
          <Link to="/signin">
            <div className={styles.loginBox}>Log in</div>
          </Link>
          <Link to="/signup">
            <div className={styles.signUpBox}>Sign Up</div>
          </Link>
        </div>
      )}
    </div>
  );
}
