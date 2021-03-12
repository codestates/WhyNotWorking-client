import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutAsync, selectIsLogin } from "../signIn/signInSlice";
import styles from "./Logout.module.css";

export function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <button
        className={styles.logoutButton}
        onClick={() => {
          dispatch(logoutAsync());
          history.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
