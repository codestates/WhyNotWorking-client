import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./pagination.module.css";
import {
  next,
  prev,
  moveToPage,
  setPageList,
  selectPage,
  selectPageList,
} from "./paginationSlice";

export function Pagination({
  getDataByPage,
}: {
  getDataByPage: (page: number) => void;
}) {
  const count = 20889999;
  const posts = true;

  const [lastPage, setLastPage] = useState<number>(0);
  const curPage = useSelector(selectPage);
  const pageList = useSelector(selectPageList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts) {
      dispatch(setPageList(Math.ceil(count / 15)));
      setLastPage(Math.ceil(count / 15));
    } else {
      dispatch(setPageList(Math.ceil(count / 36)));
      setLastPage(Math.ceil(count / 36));
    }
  }, [dispatch, posts]);

  if (lastPage === 0) return <div>loading...</div>;
  else
    return (
      <div className={styles.container}>
        <div className={styles.prevBtnWrapper}>
          {curPage > 1 ? (
            <div
              className={styles.prev}
              onClick={() => {
                dispatch(prev());
                dispatch(setPageList(lastPage));
              }}
            >
              Prev
            </div>
          ) : null}
        </div>
        <div className={styles.listWrapper}>
          {pageList.map((p) => {
            if (p === 0 || p === -1)
              return (
                <div key={pageList.indexOf(p)} className={styles.ellipsis}>
                  ...
                </div>
              );
            if (p === curPage)
              return (
                <div key={pageList.indexOf(p)} className={styles.pageSelected}>
                  {p}
                </div>
              );
            return (
              <div
                key={pageList.indexOf(p)}
                className={styles.page}
                onClick={() => {
                  dispatch(moveToPage(p));
                  dispatch(setPageList(lastPage));
                }}
              >
                {p}
              </div>
            );
          })}
        </div>
        <div className={styles.nextBtnWrapper}>
          {curPage < lastPage ? (
            <div
              className={styles.next}
              onClick={() => {
                dispatch(next());
                dispatch(setPageList(lastPage));
              }}
            >
              Next
            </div>
          ) : null}
        </div>
      </div>
    );
}
