import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SignUpDetail.module.css";
import { login, selectUserInfo } from "../signIn/signInSlice";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface TagInfo {
  id: number;
  tagName: string;
  detail: string;
}
export function SignUpDetail() {
  const userInfo = useSelector(selectUserInfo);
  const [location, setLocation] = useState<string>("");
  const [tags, setTags] = useState<Array<string | undefined>>([
    "javascript",
    "css",
    "css",
  ]);
  const [tagResult, setTagResult] = useState<TagInfo | null>({
    tagName: "java",
    detail:
      "dkdkdkdkdkkkkkkkkkkkkkkkkhfhfhfhfhfhfhfhfhfhfhfhfhffhfhfhffhfhfhffhffh",
    id: 1,
  });
  const [nickname, setNickname] = useState<string>("");
  const [image, setImage] = useState<string>("https://i.imgur.com/pG0fYRq.png");

  const dispatch = useDispatch();
  const history = useHistory();
  const fileInput = React.createRef<any>();

  const imageChangeHandler = () => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setImage(`${reader.result}`);
    };
    let url = reader.readAsDataURL(fileInput.current.files[0]);
    console.log(image);
  };

  const tagInputHandler = (tag: string) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/tags?${tag}`)
      .then((res) => {
        if (res.status === 200) {
          const { id, tagName, detail } = res.data.data;
          setTagResult({ id, tagName, detail });
        } else {
          setTags([...tags, tag]);
        }
      });
  };

  const updateSubmit = () => {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("nickname", nickname);
    formData.append("location", location);

    axios({
      method: "patch",
      url: `${process.env.REACT_APP_SERVER_HOST}/users/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_SERVER_HOST}/users/`)
          .then((res: any) => {
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
          <img className={styles.img} src={image} alt="프로필사진"></img>

          <div className={styles.imageSetting}>
            <div className={styles.head}>Profile picture</div>
            <p>Adding a photo can make it easier for others to recognize you</p>
            <label htmlFor="fileInput" className={styles.profileBtn}>
              Pick a photo
            </label>
            <input
              type="file"
              onChange={imageChangeHandler}
              ref={fileInput}
              className={styles.fileInput}
              id="fileInput"
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
            {tags.map((t, i) => {
              if (t)
                return (
                  <div
                    key={i}
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
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className={styles.icon}
                    ></FontAwesomeIcon>
                  </div>
                );
            })}
          </div>
          <input
            type="text"
            className={styles.tagInput}
            onChange={(e) => tagInputHandler(e.target.value)}
          ></input>
          {tagResult ? (
            <div className={styles.tagSearchResultBox}>
              <div className={styles.name}>{tagResult.tagName}</div>
              <div className={styles.detail}>{tagResult.detail}</div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.head}>Your location</div>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        ></input>
        <div className={styles.createBtn} onClick={updateSubmit}>
          Create my account
        </div>
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
