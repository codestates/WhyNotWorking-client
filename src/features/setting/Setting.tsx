import React, { useState, useEffect } from "react";
import styles from "./Setting.module.css";
import { MenuProps } from "../activity/Activity";
import { Editor } from "../editor/Editor";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { matchPath, useRouteMatch } from "react-router-dom";
import { setUser } from "../signIn/signInSlice";
import { useDispatch } from "react-redux";

interface SettingProps extends MenuProps {
  userId: string;
}

export function Setting({ setCurPage, userInfo, userId }: SettingProps) {
  const match = useRouteMatch();
  const [nickname, setNickname] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(
    userInfo ? userInfo.location : ""
  );
  const [image, setImage] = useState<string | undefined>(
    userInfo ? userInfo.image : ""
  );
  const [aboutMe, setAboutMe] = useState<string | undefined>(
    userInfo ? userInfo.aboutMe : ""
  );
  const [preview, setPreview] = useState<string | undefined>();
  const [saved, setSaved] = useState(false);
  const [sameName, setSameName] = useState<Boolean>(false);
  const dispatch = useDispatch();

  const getUserInfoById = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/users?user_id=${userId}`)
      .then((res) => {
        const { nickname, location, image, aboutMe } = res.data.data;
        setNickname(nickname);
        setAboutMe(aboutMe);
        setPreview(image);
        setLocation(location);
      });
  };

  const saveProfile = () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    if (nickname) {
      formData.append("nickname", nickname);
    }
    if (location) {
      formData.append("location", location);
    }
    if (aboutMe) {
      formData.append("aboutMe", aboutMe);
    }

    axios({
      method: "patch",
      url: `${process.env.REACT_APP_SERVER_HOST}/users/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        if (res.status !== 200) {
          setSameName(true);
        } else {
          setSaved(true);
          dispatch(setUser(res.data.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fileInput = React.createRef<any>();

  const imageChangeHandler = () => {
    setImage(fileInput.current.files[0]);
    let reader = new FileReader();
    reader.onloadend = () => {
      setPreview(`${reader.result}`);
    };
    let url = reader.readAsDataURL(fileInput.current.files[0]);
  };

  useEffect(() => {
    console.log(nickname);
    setCurPage("setting");
    getUserInfoById();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Edit your profile</div>
      <div className={styles.infoBox}>
        <div className={styles.imgSetting}>
          <div className={styles.midHead}>Public information</div>
          <div className={styles.imgBox}>
            <img className={styles.img} src={preview} alt="profile picture" />
            <label htmlFor="fileInput" className={styles.profileBtn}>
              Change picture
            </label>
          </div>

          <input
            type="file"
            onChange={imageChangeHandler}
            ref={fileInput}
            className={styles.fileInput}
            id="fileInput"
          ></input>
        </div>
        <div className={styles.infoSetting}>
          <div className={styles.lastHead}>Display name</div>
          <link
            href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
            rel="stylesheet"
          ></link>
          <input
            type="text"
            className={`${sameName ? styles.sameName : styles.input}`}
            value={nickname !== null ? nickname : ""}
            onChange={(e) => setNickname(e.target.value)}
          ></input>
          {sameName ? (
            <div className={styles.message}>{"such name already exists"}</div>
          ) : (
            ""
          )}
          <div className={styles.lastHead}>Location</div>
          <input
            type="text"
            className={styles.input}
            placeholder="위치 입력"
            value={location !== null ? location : ""}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
        </div>
      </div>
      <div className={styles.aboutMeBox}>
        <div className={styles.lastHead}>About me</div>
        <Editor setValue={setAboutMe} value={aboutMe} />
      </div>
      <div className={styles.btnBox}>
        <div className={`${saved ? styles.saved : styles.beforeSaved}`}>
          <FontAwesomeIcon
            icon={faCheck}
            className={styles.icon}
          ></FontAwesomeIcon>
          <div>Your profile has been saved successfully.</div>
        </div>
        <div className={styles.saveBtn} onClick={saveProfile}>
          Save profile
        </div>
      </div>
    </div>
  );
}
