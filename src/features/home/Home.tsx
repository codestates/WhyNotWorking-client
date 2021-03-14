import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { Description } from "../description/Description";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import { gitHubSignUp } from "../signUp/signUpSlice";
import styles from "./Home.module.css";

export function Home() {
  let match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(match.path));
    window.scrollTo(0, 0);
  }, [dispatch, match]);

  return (
    <div className={styles.container}>
      <div className={styles.title}></div>
      <div className={styles.head}>
        Questions are everywhere, answers are on Queue Overflow
      </div>
      <Description />
    </div>
  );
}
