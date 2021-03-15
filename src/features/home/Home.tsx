import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch, useHistory, Link } from "react-router-dom";
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
      <div className={styles.title}>
        <h1 className={styles.titleMessage}>We &lt;3 Capybara</h1>
        <div className={styles.titleSummary}>
          Stack overflow build products that empower<br></br>developers and
          connect them to solutions that<br></br>enable productivity, growth,
          and discovery.
        </div>
      </div>
      <div className={styles.head}>
        Questions are everywhere, answers are on Queue Overflow
      </div>
      <Description />
      <div className={styles.login}>
        <div className={styles.loginTitle}>
          If you want to use all the features,<br></br>Follow the steps below
        </div>
        <div className={styles.loginImage1}>
          <div className={styles.image1}></div>
          <div className={styles.imageText1}>Easy sign-up!!</div>
        </div>
        <div className={styles.loginImage2}>
          <div className={styles.imageText2}>Enter your information.</div>
          <div className={styles.image2}></div>
        </div>
        <div className={styles.btnBox}>
          <Link to="/signup">
            <div className={styles.signUpBtn}>Create an account</div>
          </Link>
        </div>
        <div className={styles.rocket}></div>
        <div className={styles.robot}></div>
      </div>
    </div>
  );
}
