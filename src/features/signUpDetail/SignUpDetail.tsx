import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SignUpDetail.module.css";
import { login, selectUserInfo, setUser } from "../signIn/signInSlice";
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

  const [allTags, setAllTags] = useState<TagInfo[] | null>(null);
  const [word, setWord] = useState<string>("");
  const [tagResult, setTagResult] = useState<Array<TagInfo | undefined>>([]);
  const [userTags, setUserTags] = useState<Array<TagInfo | undefined>>([]);

  const [nickname, setNickname] = useState<string | null>(null);
  const [image, setImage] = useState<string | undefined>(
    userInfo ? userInfo.image : ""
  );
  const [preview, setPreview] = useState<string>(
    "https://i.imgur.com/lqGXdm7.png"
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const fileInput = React.createRef<any>();

  const getAllTags = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/tags/allTags`)
      .then((res) => {
        setAllTags(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchTag = (word: string) => {
    console.log(allTags);
    console.log(word);
    if (allTags) {
      setTagResult(
        allTags.filter(
          (v) => ((v.tagName as unknown) as string).search(word) !== -1
        )
      );
      console.log(
        allTags.filter((v) => ((v.tagName as unknown) as string) === word)
      );
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);

  const imageChangeHandler = () => {
    setImage(fileInput.current.files[0]);
    let reader = new FileReader();
    reader.onloadend = () => {
      setPreview(`${reader.result}`);
    };
    let url = reader.readAsDataURL(fileInput.current.files[0]);
    console.log(image);
  };

  const updateSubmit = () => {
    const formData = new FormData();
    if (image) formData.append("image", image);
    if (nickname) formData.append("nickname", nickname);
    formData.append("location", location);

    axios({
      method: "patch",
      url: `${process.env.REACT_APP_SERVER_HOST}/users/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    }).then((res) => {
      dispatch(setUser(res.data.data));
      history.push("/");
      // const tagIdArr = userTags.map((t) => {
      //   if (t) return t.id;
      // });
      // if (tagIdArr.length > 0) {
      //   axios({
      //     method: "post",
      //     url: `${process.env.REACT_APP_SERVER_HOST}/userTags/`,
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     data: {
      //       userId: userInfo ? userInfo.id : "",
      //       tagId: tagIdArr,
      //     },
      //   }).then(() => {
      //     history.push("/");
      //   });

      // } else {
      //   history.push("/");
      // }
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
          value={nickname ? nickname : ""}
          onChange={(e) => setNickname(e.target.value)}
        />
        <div className={styles.imageSettingBox}>
          <img className={styles.img} src={preview} alt="프로필사진"></img>

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
        <div className={styles.head}>Technology tags that interest you 🚧</div>
        <p>
          Picking tags will help us show you much more relevant questions and
          answers
        </p>
        <div className={styles.input}>
          <div className={styles.selectedTagsBox}>
            {userTags
              ? userTags.map((t, i) => {
                  if (t)
                    return (
                      <div
                        key={i}
                        className={styles.selectedTag}
                        onClick={() => {
                          setUserTags(
                            userTags.map((T) => {
                              if (T !== t) return T;
                            })
                          );
                        }}
                      >
                        {t.tagName}
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className={styles.icon}
                        ></FontAwesomeIcon>
                      </div>
                    );
                })
              : ""}
          </div>
          <input
            value={word}
            type="text"
            className={styles.tagInput}
            onChange={(e) => {
              setWord(e.target.value);
              console.log(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === " ") {
                searchTag(word);
                console.log(word);
                setWord("");
              }
            }}
            disabled
          ></input>
        </div>
        <div
          className={`${
            tagResult.length > 0 ? styles.tagSearchResultBox : styles.noneResult
          }`}
        >
          {tagResult
            ? tagResult.map((t, i) => {
                if (t) {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setUserTags([...userTags, t]);
                        setTagResult([]);
                      }}
                      className={styles.tagWrapper}
                    >
                      <div className={styles.name}>{t.tagName}</div>
                      <div className={styles.detail}>{t.detail}</div>
                    </div>
                  );
                }
              })
            : ""}
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
