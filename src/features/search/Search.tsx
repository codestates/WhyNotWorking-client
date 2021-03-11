import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";

export function Search() {
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState<Array<{ id: number; title: string }>>([]);
  const [searchResult, setSearchResult] = useState<
    Array<{ id: number; title: string }>
  >([]);

  const getPosts = () => {
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/posts/title/`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios((config as unknown) as string)
      .then(function (response: any) {
        setPosts(response.data.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const searchFunc = (word: string) => {
    setSearchResult(
      posts.filter((v) => ((v.title as unknown) as string).search(word) !== -1)
    );
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.search}
        placeholder="Search..."
        onChange={(e) => {
          searchFunc(e.target.value);
          setInputValue(e.target.value);
        }}
      />
      <ul className={styles.autoComplete}>
        {searchResult.map((v) => (
          <Link to={`/post/${v.id}`}>
            <li
              className={`${styles.autoCompleteItems} ${
                inputValue === "" ? styles.invisible : styles.visible
              }`}
              key={v.id}
            >
              {v.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
