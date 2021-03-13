import {
  faInbox,
  faTrophy,
  faQuestionCircle,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import styles from "./TopQuestion.module.css";

export function TopQuestion() {
  let match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(match.path));
  }, [dispatch, match]);

  return <div className={styles.container}>Home</div>;
}
