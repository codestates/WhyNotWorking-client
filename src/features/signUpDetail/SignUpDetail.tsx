import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SignUpDetail.module.css";
import { login, selectUserInfo } from "./signInSlice";

import axios from "axios";
import { useHistory } from "react-router-dom";

export function SignUpDetail() {
  const userInfo = useSelector(selectUserInfo);
  const [location, setLocation] = useState<string>("");
  const [tags, setTags] = useState<Array<string | undefined>>([]);
  const [nickname, setNickname] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const fileInput = () => React.createRef<HTMLInputElement | null>();

  // const imageChangeHandler = () => {
  //   if (fileInput()) {
  //     setImage(fileInput().current.files[0]);
  //   }
  // };
  const updateSubmit = () => {
    const data = JSON.stringify({
      location,
      image,
      nickname,
    });
    axios({
      method: "patch",
      url: "https://localhost:4000/users/",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    })
      .then(() => {
        axios.get("https://localhost:4000/users/").then((res: any) => {
          dispatch(login(res));
          history.push("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <h1>You’re almost done!</h1>
      <h2>
        Share a little more about yourself, and we'll show you more relevant
        questions.
      </h2>
      <div className={styles.detailBox}>
        <div className={styles.head}>Display name</div>
        <p>Your display name will be shown on your posts and comments.</p>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => setNickname(e.target.value)}
        />
        <div className={styles.imageSettingBox}>
          <img
            className={styles.img}
            src="https://i.imgur.com/pG0fYRq.png"
            alt="프로필사진"
          ></img>
          <div className={styles.imageSetting}>
            <div className={styles.head}>Profile picture</div>
            <p>Adding a photo can make it easier for others to recognize you</p>
            <input
              type="file"
              // onChange={imageChangeHandler}
              ref={fileInput}
              className={styles.fileUploader}
              id="fileUploader"
            ></input>
          </div>
        </div>
        <div className={styles.head}>Technology tags that interest you</div>
        <p>
          Picking tags will help us show you much more relevant questions and
          answers
        </p>
        <div className={styles.input}>
          <div className={styles.selectedTagsBox}>
            {tags.map((t) => (
              <div
                key={tags.indexOf(t)}
                className={styles.selectedTag}
                onClick={() => {
                  setTags(
                    tags.map((T) => {
                      if (T !== t) return T;
                    })
                  );
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <input type="text" className={styles.tagInput}></input>
        </div>
        <div className={styles.head}>Your location</div>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        ></input>
        <div className={styles.createBtn}>Create my account</div>
        <div className={styles.policy}>
          By clicking "Create my account", you agree to our
          <div className={styles.point}>terms of service</div>,
          <div className={styles.point}>privacy policy</div>and
          <div className={styles.point}>cookie policy</div>
        </div>
      </div>
    </div>
  );
}
