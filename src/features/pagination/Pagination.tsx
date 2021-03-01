import React, { useState } from "react";
import styles from "./pagination.module.css";

export function Pagination() {
  const posts = 20889999;
  const lastPage = Math.ceil(posts / 15);
  const [page, setPage] = useState(5);
  let pageList = [];
  if (lastPage < 5) {
    for (let i = 1; i <= lastPage; i++) {
      pageList.push(i);
    }
  } else {
    pageList = [1, 2, 3, 4, 5];
  }
  if (page > 1) {
    return (
      <div className={styles.container}>
        <div className={styles.prev}>Prev</div>
        {pageList.length < 5 ? (
          pageList.map((p) => {
            if (p === page) {
              return <div className={styles.pageSelected}>{p}</div>;
            }
            return (
              <div className={styles.page} onClick={() => setPage(p)}>
                {p}
              </div>
            );
          })
        ) : (
          <>
            {pageList.slice(0, 5).map((p) => {
              if (p === page) {
                return <div className={styles.pageSelected}>{p}</div>;
              }
              return <div className={styles.page}>{p}</div>;
            })}
            <div className={styles.ellipsis}>...</div>
            <div>{lastPage}</div>
          </>
        )}
        <div className={styles.next}>Next</div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {pageList.length < 5 ? (
        pageList.map((p) => {
          if (p === page) {
            return <div className={styles.pageSelected}>{p}</div>;
          }
          return <div className={styles.page}>{p}</div>;
        })
      ) : (
        <>
          {pageList.slice(0, 5).map((p) => {
            if (p === page) {
              return <div className={styles.pageSelected}>{p}</div>;
            }
            return <div className={styles.page}>{p}</div>;
          })}
          <div className={styles.ellipsis}>...</div>
          <div>{lastPage}</div>
        </>
      )}
      <div className={styles.next}>Next</div>
    </div>
  );
}
