import React, { useEffect, useState } from "react";

import { Pagination } from "../pagination/Pagination";
import styles from "./Users.module.css";
import { User } from "../user/UUser";
import { useDispatch } from "react-redux";
import { useRouteMatch, useLocation } from "react-router-dom";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import axios from "axios";

export interface UserInfo {
  id: number;
  nickname: string;
  email: string;
  image: string;
  location: string;
  tag: { tagName: string }[];
  createdAt?: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function Users() {
  let match = useRouteMatch();
  let query = useQuery();
  const dispatch = useDispatch();
  const [users, setUsers] = useState<UserInfo[]>();
  const [count, setCount] = useState<number>();

  const getUsersByPage = (page: number) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/users?page=${page}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setUsers(res.data.data);
    });
  };

  const getUsersCount = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/users/count`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setCount(res.data.data[0].count);
    });
  };

  useEffect(() => {
    const currentPage = (query.get("page") as unknown) as number;
    dispatch(setCurrentPage(match.path));
    getUsersByPage(currentPage);
    getUsersCount();
    window.scrollTo(0, 0);
  }, [dispatch, match]);

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>Users</div>

      <div className={styles.controllBox}>
        <link
          href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
          rel="stylesheet"
        ></link>
        {/* <input
          className={styles.input}
          placeholder="&#xf002; Filter by user"
        ></input> */}
        <div className={styles.filterBox}>
          {/* <div className={styles.popular}>New users</div>
          <div className={styles.name}>questions</div>
          <div className={styles.new}>answers</div> */}
        </div>
      </div>
      <div className={styles.listBox}>
        {users ? users.map((u, i) => <User key={i} userInfo={u} />) : ""}
      </div>
      <div className={styles.paginationBox}>
        <Pagination count={count} path={"users"} />
      </div>
    </div>
  );
}
