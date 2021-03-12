import React, { useEffect, useState } from "react";
import styles from "./User.module.css";
import { UserInfo } from "../users/UsersPage";
import axios from "axios";
import { Link } from "react-router-dom";
interface UserProps {
  userInfo: UserInfo;
}

export interface TagInfo {
  id: number;
  tagName: string;
  detail: string;
}

export function User({ userInfo }: UserProps) {
  const [tags, setTags] = useState<TagInfo[]>();

  const getUsersTags = (userId: number) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/tags?user_id=${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setTags(res.data.data);
    });
  };

  useEffect(() => {
    getUsersTags(userInfo.id);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        <Link to={`/users/${userInfo.id}`}>
          <img src={userInfo.image} alt="프로필사진"></img>
        </Link>
      </div>
      <div className={styles.infoBox}>
        <div className={styles.name}>{userInfo.nickname}</div>
        <div className={styles.info}>
          <div className={styles.region}>{userInfo.nickname}</div>
          <div className={styles.createdDate}>one day</div>
        </div>
        <div className={styles.tags}>
          {tags
            ? tags.map((t, i) => (
                <div key={i} className={styles.tag}>
                  {t.tagName}
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}
