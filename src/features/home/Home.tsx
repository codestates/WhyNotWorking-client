import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import styles from "./Home.module.css";

export function Home() {
  let match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(match.path));
  }, [dispatch, match]);

  return <div className={styles.container}>Home</div>;
}
