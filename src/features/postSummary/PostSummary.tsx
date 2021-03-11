import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./PostSummary.module.css";

interface PostSummaryProps {
  vote: number;
  title: string;
  createdAt: string;
}

export function PostSummary({ vote, title, createdAt }: PostSummaryProps) {
  const history = useHistory();
  return (
    <div className={styles.container}>
      <div className={styles.vote}>{vote}</div>

      <div className={styles.title}>{title}</div>

      <div className={styles.date}>{createdAt}</div>
    </div>
  );
}
