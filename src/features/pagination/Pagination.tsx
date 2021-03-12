import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./pagination.module.css";

export function Pagination({
  getDataByPage,
  count,
  isQuestion,
}: {
  getDataByPage: (page: number) => void;
  count: number | undefined;
  isQuestion: Boolean;
}) {
  const [lastPage, setLastPage] = useState<number>(5);
  const [curPage, setCurPage] = useState(1);
  const [pageList, setPageList] = useState<number[]>([1, 2, 3, 4, 5]);

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
  }, [isQuestion]);

  return (
    <div className={styles.container}>
      <div className={styles.prevBtnWrapper}>
        {curPage > 1 ? (
          <div
            className={styles.prev}
            onClick={() => {
              setCurPage(curPage - 1);
              getPageList(curPage - 1, lastPage);
            }}
          >
            Prev
          </div>
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
          // if (p === curPage)
          //   return (
          //     <div key={i} className={styles.pageSelected}>
          //       {p}
          //     </div>
          //   );
          return (
            <div
              key={i}
              className={`${styles.page} ${
                curPage === p ? styles.pageSelected : ""
              }`}
              onClick={() => {
                setCurPage(p);
                getPageList(p, lastPage);
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
              setCurPage(curPage + 1);
              getPageList(curPage + 1, lastPage);
            }}
          >
            Next
          </div>
        ) : null}
      </div>
    </div>
  );
}

// export function Pagination({
//   getDataByPage,
// }: {
//   getDataByPage: (page: number) => void;
// }) {
//   const count = 20889999;
//   const posts = true;

//   const [lastPage, setLastPage] = useState<number>(0);
//   const curPage = useSelector(selectPage);
//   const pageList = useSelector(selectPageList);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (posts) {
//       dispatch(setPageList(Math.ceil(count / 15)));
//       setLastPage(Math.ceil(count / 15));
//     } else {
//       dispatch(setPageList(Math.ceil(count / 36)));
//       setLastPage(Math.ceil(count / 36));
//     }
//   }, [dispatch, posts]);

//   if (lastPage === 0) return <div>loading...</div>;
//   else
//     return (
//       <div className={styles.container}>
//         <div className={styles.prevBtnWrapper}>
//           {curPage > 1 ? (
//             <div
//               className={styles.prev}
//               onClick={() => {
//                 dispatch(prev());
//                 dispatch(setPageList(lastPage));
//               }}
//             >
//               Prev
//             </div>
//           ) : null}
//         </div>
//         <div className={styles.listWrapper}>
//           {pageList.map((p) => {
//             if (p === 0 || p === -1)
//               return (
//                 <div key={pageList.indexOf(p)} className={styles.ellipsis}>
//                   ...
//                 </div>
//               );
//             if (p === curPage)
//               return (
//                 <div key={pageList.indexOf(p)} className={styles.pageSelected}>
//                   {p}
//                 </div>
//               );
//             return (
//               <div
//                 key={pageList.indexOf(p)}
//                 className={styles.page}
//                 onClick={() => {
//                   dispatch(moveToPage(p));
//                   dispatch(setPageList(lastPage));
//                 }}
//               >
//                 {p}
//               </div>
//             );
//           })}
//         </div>
//         <div className={styles.nextBtnWrapper}>
//           {curPage < lastPage ? (
//             <div
//               className={styles.next}
//               onClick={() => {
//                 dispatch(next());
//                 dispatch(setPageList(lastPage));
//               }}
//             >
//               Next
//             </div>
//           ) : null}
//         </div>
//       </div>
//     );
// }
