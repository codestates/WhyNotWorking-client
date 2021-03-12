import React, { useState, useEffect } from "react";
import styles from "./pagination.module.css";
import { Link } from "react-router-dom";

export function Pagination({
  getDataByPage,
  count,
  isQuestion,
  path,
}: {
  getDataByPage: (page: number) => void;
  count: number | undefined;
  isQuestion: Boolean;
  path: string;
}) {
  const [lastPage, setLastPage] = useState<number>(0);
  const [curPage, setCurPage] = useState(1);
  const [pageList, setPageList] = useState<number[]>([]);

  const getPageList = (curPage: number, lastPage: number) => {
    if (lastPage < 7) {
      let list: Array<number> = [];
      for (let i = 1; i <= lastPage; i++) {
        list.push(i);
      }
      setPageList(list);
    } else {
      if (curPage - 4 >= 1 && curPage + 4 <= lastPage) {
        setPageList([
          1,
          0,
          curPage - 2,
          curPage - 1,
          curPage,
          curPage + 1,
          curPage + 2,
          -1,
          lastPage,
        ]);
        return;
      }
      if (curPage - 4 >= 1 || curPage + 4 > lastPage) {
        setPageList([
          1,
          0,
          lastPage - 4,
          lastPage - 3,
          lastPage - 2,
          lastPage - 1,
          lastPage,
        ]);
        return;
      }
      if (curPage < 4 || curPage + 4 <= lastPage) {
        setPageList([1, 2, 3, 4, 5, 0, lastPage]);
        return;
      }
    }
  };

  useEffect(() => {
    if (count) {
      if (isQuestion) {
        getPageList(1, Math.ceil(count / 15));
        setLastPage(Math.ceil(count / 15));
      } else {
        getPageList(1, Math.ceil(count / 36));
        setLastPage(Math.ceil(count / 36));
      }
    }
  }, []);
  if (lastPage === 0) return <div></div>;
  else
    return (
      <div className={styles.container}>
        <div className={styles.prevBtnWrapper}>
          {curPage > 1 ? (
            <Link to={`/${path}?page=${curPage - 1}`} className={styles.link}>
              <div
                className={styles.btn}
                onClick={() => {
                  setCurPage(curPage - 1);
                  getPageList(curPage - 1, lastPage);
                }}
              >
                Prev
              </div>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className={styles.listWrapper}>
          {pageList.map((p, i) => {
            if (p === 0 || p === -1)
              return (
                <div key={i} className={styles.ellipsis}>
                  ...
                </div>
              );
            return (
              <Link to={`/${path}?page=${p}`} className={styles.link}>
                <div
                  key={i}
                  className={`${styles.btn} ${
                    curPage === p ? styles.pageSelected : ""
                  }`}
                  onClick={() => {
                    setCurPage(p);
                    getPageList(p, lastPage);
                    // getDataByPage(p);
                  }}
                >
                  {p}
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.nextBtnWrapper}>
          {curPage < lastPage ? (
            <Link to={`/${path}?page=${curPage + 1}`} className={styles.link}>
              <div
                className={styles.btn}
                onClick={() => {
                  setCurPage(curPage + 1);
                  getPageList(curPage + 1, lastPage);
                }}
              >
                Next
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    );
}
